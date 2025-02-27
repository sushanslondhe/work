"use client"

import React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameDay,
  isSameMonth,
} from "date-fns"

type Event = {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  color: string
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"week" | "month">("week")
  const [events, setEvents] = useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    color: "blue",
  })

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const shortWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
  const colorOptions = ["blue", "green", "red", "purple", "yellow", "pink"]

  // Get days for the current week view
  const getDaysInWeek = () => {
    const start = startOfWeek(currentDate)
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }

  // Get days for the current month view
  const getDaysInMonth = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const startDate = startOfWeek(firstDayOfMonth)

    // 6 weeks (rows) × 7 days (columns)
    return Array.from({ length: 42 }, (_, i) => addDays(startDate, i))
  }

  // Navigate to previous/next period
  const navigatePrevious = () => {
    if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      setCurrentDate(subMonths(currentDate, 1))
    }
  }

  const navigateNext = () => {
    if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      setCurrentDate(addMonths(currentDate, 1))
    }
  }

  // Handle slot click to create a new event
  const handleSlotClick = (date: Date, hour: number) => {
    setSelectedSlot({ date, hour })
    setIsDialogOpen(true)
  }

  // Create a new event
  const handleCreateEvent = () => {
    if (selectedSlot && newEvent.title) {
      const startTime = new Date(selectedSlot.date)
      startTime.setHours(selectedSlot.hour)
      startTime.setMinutes(0)

      const endTime = new Date(startTime)
      endTime.setHours(startTime.getHours() + 1)

      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        start: startTime,
        end: endTime,
        color: newEvent.color,
      }

      setEvents([...events, event])
      setIsDialogOpen(false)
      setNewEvent({ title: "", description: "", color: "blue" })
    }
  }

  // Get events for a specific day and hour
  const getEventsForSlot = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return isSameDay(eventDate, date) && eventDate.getHours() === hour
    })
  }

  // Get events for a specific day (month view)
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(event.start, date))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {view === "week"
            ? `Week of ${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`
            : format(currentDate, "MMMM yyyy")}
        </h1>
        <div className="flex items-center space-x-4">
          <Select value={view} onValueChange={(value: "week" | "month") => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {view === "week" ? (
        // Week View
        <div className="border rounded-lg overflow-hidden">
          {/* Header - Days of Week */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
            <div className="border-r p-2 bg-muted"></div>
            {getDaysInWeek().map((day, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 text-center font-medium border-r",
                  isSameDay(day, new Date()) ? "bg-primary/10" : "bg-muted",
                )}
              >
                <div>{shortWeekDays[day.getDay()]}</div>
                <div>{format(day, "d")}</div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)]">
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                {/* Time Label */}
                <div className="border-r border-b p-2 text-xs text-center">
                  {hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                </div>

                {/* Day Cells */}
                {getDaysInWeek().map((day, dayIndex) => {
                  const eventsInSlot = getEventsForSlot(day, hour)

                  return (
                    <div
                      key={dayIndex}
                      className="border-r border-b p-1 h-20 relative"
                      onClick={() => handleSlotClick(day, hour)}
                    >
                      {eventsInSlot.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                          <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {eventsInSlot.map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "p-1 mb-1 rounded text-xs overflow-hidden",
                            event.color === "blue" && "bg-blue-100 border-l-4 border-blue-500",
                            event.color === "green" && "bg-green-100 border-l-4 border-green-500",
                            event.color === "red" && "bg-red-100 border-l-4 border-red-500",
                            event.color === "purple" && "bg-purple-100 border-l-4 border-purple-500",
                            event.color === "yellow" && "bg-yellow-100 border-l-4 border-yellow-500",
                            event.color === "pink" && "bg-pink-100 border-l-4 border-pink-500",
                          )}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="truncate">{format(event.start, "h:mm a")}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        // Month View
        <div className="border rounded-lg overflow-hidden">
          {/* Header - Days of Week */}
          <div className="grid grid-cols-7 border-b bg-muted">
            {shortWeekDays.map((day) => (
              <div key={day} className="p-2 text-center font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((day, index) => {
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isToday = isSameDay(day, new Date())
              const dayEvents = getEventsForDay(day)

              return (
                <div
                  key={index}
                  className={cn(
                    "border p-1 min-h-[100px]",
                    !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                    isToday && "bg-primary/10",
                  )}
                  onClick={() => handleSlotClick(day, 9)} // Default to 9 AM for month view
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={cn(
                        "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                        isToday && "bg-primary text-primary-foreground",
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "px-1 py-0.5 rounded text-xs truncate",
                          event.color === "blue" && "bg-blue-100 border-l-2 border-blue-500",
                          event.color === "green" && "bg-green-100 border-l-2 border-green-500",
                          event.color === "red" && "bg-red-100 border-l-2 border-red-500",
                          event.color === "purple" && "bg-purple-100 border-l-2 border-purple-500",
                          event.color === "yellow" && "bg-yellow-100 border-l-2 border-yellow-500",
                          event.color === "pink" && "bg-pink-100 border-l-2 border-pink-500",
                        )}
                      >
                        {format(event.start, "h:mm a")} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Event Creation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Add title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add description"
              />
            </div>
            <div className="grid gap-2">
              <Label>Date & Time</Label>
              <div className="text-sm">
                {selectedSlot && (
                  <span>
                    {format(selectedSlot.date, "EEEE, MMMM d")} at{" "}
                    {selectedSlot.hour === 12
                      ? "12 PM"
                      : selectedSlot.hour < 12
                        ? `${selectedSlot.hour} AM`
                        : `${selectedSlot.hour - 12} PM`}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full mr-2",
                            color === "blue" && "bg-blue-500",
                            color === "green" && "bg-green-500",
                            color === "red" && "bg-red-500",
                            color === "purple" && "bg-purple-500",
                            color === "yellow" && "bg-yellow-500",
                            color === "pink" && "bg-pink-500",
                          )}
                        />
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

