"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CandidateInfoProps {
  data: {
    candidate: {
      id: string
      name: string
      email: string
      phone: string
    }
  }
}

export function CandidateInfo({ data }: CandidateInfoProps) {
  const { candidate } = data
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <>
      <Card className="w-[80px] shadow-md">
        <CardContent className="p-3 flex flex-col items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-12 w-12 mb-2">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[200px]">
                <div className="space-y-1">
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  <p className="text-xs text-muted-foreground">{candidate.phone}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-xs font-medium text-center truncate w-full">{candidate.name}</p>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  )
}

