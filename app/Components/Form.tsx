"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { submitTicket } from "./actions"

const ticketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  priority: z.string().min(1, "Please select a priority"),
})

export default function RaiseTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      category: "",
      description: "",
      priority: "",
    },
  })

  async function onSubmit(data: z.infer<typeof ticketSchema>) {
    setIsSubmitting(true)
    try {
      await submitTicket(data)
      toast({
        title: "Ticket Submitted",
        description: "Your HR ticket has been successfully submitted.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter the subject of your ticket" {...field} />
              </FormControl>
              <FormDescription>Briefly describe the issue or request</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="payroll">Payroll</SelectItem>
                  <SelectItem value="leave">Leave Request</SelectItem>
                  <SelectItem value="benefits">Benefits</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose the category that best fits your request</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide details about your request or issue"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please provide as much detail as possible</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Indicate the urgency of your request</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </Form>
  )
}

//screenshot field here


