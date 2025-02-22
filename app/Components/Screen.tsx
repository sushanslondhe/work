"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface FileUploadProps {
  onChange: (files: File[]) => void
  value: File[]
  minFiles?: number
  maxFiles?: number
}

export function FileUpload({ onChange, value, minFiles = 2, maxFiles = 5 }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = [...value, ...files]

    if (newFiles.length < minFiles) {
      setError(`Please upload at least ${minFiles} screenshots`)
    } else if (newFiles.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} screenshots`)
    } else {
      setError(null)
      onChange(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange(newFiles)
    if (newFiles.length < minFiles) {
      setError(`Please upload at least ${minFiles} screenshots`)
    } else {
      setError(null)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
          Upload Screenshots
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <span className="text-sm text-muted-foreground">
          {value.length} / {maxFiles} files
        </span>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {value.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file) || "/placeholder.svg"}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

//FIle upload mmain here


"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { submitTicket } from "./actions"
import { FileUpload } from "./file-upload"

const ticketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  priority: z.string().min(1, "Please select a priority"),
  screenshots: z
    .array(z.instanceof(File))
    .min(2, "Please upload at least 2 screenshots")
    .max(5, "You can upload a maximum of 5 screenshots"),
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
      screenshots: [],
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
        {/* Existing form fields... */}

        <FormField
          control={form.control}
          name="screenshots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screenshots</FormLabel>
              <FormControl>
                <FileUpload onChange={field.onChange} value={field.value} minFiles={2} maxFiles={5} />
              </FormControl>
              <FormDescription>Upload at least 2 screenshots (maximum 5) related to your issue</FormDescription>
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


