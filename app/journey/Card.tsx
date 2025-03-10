"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Phone, ArrowRight, Edit, Trash } from "lucide-react"
import type { Candidate, CandidateStatus } from "@/lib/types"
import { EditCandidateDialog } from "@/components/edit-candidate-dialog"
import { cn } from "@/lib/utils"

interface CandidateCardProps {
  data: {
    candidate: Candidate
  }
}

export function CandidateCard({ data }: CandidateCardProps) {
  const { candidate } = data
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "ongoing":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "pending":
        return "bg-slate-500 hover:bg-slate-600"
      default:
        return "bg-slate-500 hover:bg-slate-600"
    }
  }

  const getStatusText = (status: CandidateStatus) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "ongoing":
        return "Ongoing"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card className="w-[280px] shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <Badge className={cn("ml-2", getStatusColor(candidate.status))}>{getStatusText(candidate.status)}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{candidate.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{candidate.phone}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{candidate.date}</span>
            </div>
            {candidate.notes && (
              <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                <p>{candidate.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button size="sm">
            Next Stage
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>
      <Handle type="source" position={Position.Right} />

      <EditCandidateDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} candidate={candidate} />
    </>
  )
}

