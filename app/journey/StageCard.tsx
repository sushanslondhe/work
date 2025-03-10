"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { EditStageDialog } from "@/components/edit-stage-dialog"

interface StageCardProps {
  data: {
    candidate: any
    stage: { id: string; label: string }
    stageStatus: { status: "pending" | "ongoing" | "completed"; date: string; notes: string }
    isCurrentStage: boolean
    onUpdateStatus: (status: "pending" | "ongoing" | "completed") => void
    onMoveToNextStage: () => void
  }
}

export function StageCard({ data }: StageCardProps) {
  const { candidate, stage, stageStatus, isCurrentStage, onUpdateStatus, onMoveToNextStage } = data
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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
      <Card
        className={cn(
          "w-[180px] shadow-md transition-all duration-200",
          isCurrentStage ? "ring-2 ring-primary" : "",
          stageStatus.status === "completed" ? "bg-green-50" : "",
          stageStatus.status === "ongoing" ? "bg-yellow-50" : "",
        )}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <Badge className={cn("text-xs", getStatusColor(stageStatus.status))}>
              {getStatusText(stageStatus.status)}
            </Badge>
            {isCurrentStage && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                Current
              </Badge>
            )}
          </div>

          {stageStatus.date && (
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{stageStatus.date}</span>
            </div>
          )}

          {stageStatus.notes && (
            <div className="mt-1 mb-2">
              <p className="text-xs line-clamp-2">{stageStatus.notes}</p>
            </div>
          )}

          <div className="flex justify-between mt-2">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-3 w-3" />
            </Button>

            {isCurrentStage && stageStatus.status !== "completed" && (
              <Button size="sm" className="h-7 text-xs" onClick={onMoveToNextStage}>
                Next
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />

      <EditStageDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        candidateName={candidate.name}
        stageName={stage.label}
        stageStatus={stageStatus}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  )
}

