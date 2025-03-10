"use client"

import { useState } from "react"
import ReactFlow, { Background, Controls, type Edge, MarkerType, type Node, type NodeTypes, Panel } from "reactflow"
import "reactflow/dist/style.css"
import { StageCard } from "@/components/stage-card"
import { CandidateInfo } from "@/components/candidate-info"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddCandidateDialog } from "@/components/add-candidate-dialog"
import type { Candidate } from "@/lib/types"

// Define custom node types
const nodeTypes: NodeTypes = {
  stageCard: StageCard,
  candidateInfo: CandidateInfo,
}

// Define the stages in the candidate journey
const stages = [
  { id: "resume-screening", label: "Resume Screening" },
  { id: "call-screening", label: "Call Screening" },
  { id: "assessment-test", label: "Assessment Test" },
  { id: "technical-interview", label: "Technical Interview" },
  { id: "hr-interview", label: "HR Interview" },
]

// Sample candidate data
const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    currentStage: "technical-interview",
    stageStatuses: {
      "resume-screening": { status: "completed", date: "2023-10-05", notes: "Strong resume with relevant experience" },
      "call-screening": { status: "completed", date: "2023-10-10", notes: "Good communication skills" },
      "assessment-test": { status: "completed", date: "2023-10-15", notes: "Scored 85% on the assessment" },
      "technical-interview": { status: "ongoing", date: "2023-10-20", notes: "Scheduled for technical interview" },
      "hr-interview": { status: "pending", date: "", notes: "" },
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    currentStage: "assessment-test",
    stageStatuses: {
      "resume-screening": { status: "completed", date: "2023-10-08", notes: "Impressive portfolio" },
      "call-screening": { status: "completed", date: "2023-10-12", notes: "Excellent phone screening" },
      "assessment-test": { status: "ongoing", date: "2023-10-18", notes: "Assessment in progress" },
      "technical-interview": { status: "pending", date: "", notes: "" },
      "hr-interview": { status: "pending", date: "", notes: "" },
    },
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 456-7890",
    currentStage: "call-screening",
    stageStatuses: {
      "resume-screening": { status: "completed", date: "2023-10-10", notes: "Good technical background" },
      "call-screening": { status: "ongoing", date: "2023-10-17", notes: "Scheduled for call screening" },
      "assessment-test": { status: "pending", date: "", notes: "" },
      "technical-interview": { status: "pending", date: "", notes: "" },
      "hr-interview": { status: "pending", date: "", notes: "" },
    },
  },
]

export default function CandidateJourney() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Create nodes for each candidate and their stages
  const createNodes = (): Node[] => {
    const nodes: Node[] = []

    // Add stage header nodes
    stages.forEach((stage, index) => {
      nodes.push({
        id: `header-${stage.id}`,
        type: "default",
        position: { x: 250 * index + 100, y: 0 },
        data: {
          label: (
            <div className="font-semibold text-lg py-2 px-4 bg-muted rounded-md text-center w-[180px]">
              {stage.label}
            </div>
          ),
        },
        style: {
          width: 200,
          background: "transparent",
          border: "none",
        },
      })
    })

    // Add candidate info nodes on the left
    candidates.forEach((candidate, candidateIndex) => {
      nodes.push({
        id: `candidate-${candidate.id}`,
        type: "candidateInfo",
        position: { x: 0, y: 100 + candidateIndex * 150 },
        data: { candidate },
        style: {
          width: 80,
        },
      })

      // Add stage nodes for each candidate
      stages.forEach((stage, stageIndex) => {
        const stageStatus = candidate.stageStatuses[stage.id]

        nodes.push({
          id: `${candidate.id}-${stage.id}`,
          type: "stageCard",
          position: { x: 250 * stageIndex + 100, y: 100 + candidateIndex * 150 },
          data: {
            candidate,
            stage,
            stageStatus,
            isCurrentStage: candidate.currentStage === stage.id,
            onUpdateStatus: (status) => handleUpdateStageStatus(candidate.id, stage.id, status),
            onMoveToNextStage: () => handleMoveToNextStage(candidate.id),
          },
        })
      })
    })

    return nodes
  }

  // Create edges to connect the stages for each candidate
  const createEdges = (): Edge[] => {
    const edges: Edge[] = []

    // Connect stage headers
    for (let i = 0; i < stages.length - 1; i++) {
      edges.push({
        id: `header-edge-${i}`,
        source: `header-${stages[i].id}`,
        target: `header-${stages[i + 1].id}`,
        type: "smoothstep",
        style: { strokeWidth: 2, stroke: "#94a3b8" },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#94a3b8",
        },
      })
    }

    // Connect stages for each candidate
    candidates.forEach((candidate) => {
      // Connect candidate info to first stage
      edges.push({
        id: `candidate-${candidate.id}-to-first-stage`,
        source: `candidate-${candidate.id}`,
        target: `${candidate.id}-${stages[0].id}`,
        type: "smoothstep",
        style: { strokeWidth: 1, stroke: "#94a3b8" },
      })

      // Connect stages
      for (let i = 0; i < stages.length - 1; i++) {
        const sourceStage = stages[i].id
        const targetStage = stages[i + 1].id
        const sourceStatus = candidate.stageStatuses[sourceStage].status

        edges.push({
          id: `${candidate.id}-${sourceStage}-to-${targetStage}`,
          source: `${candidate.id}-${sourceStage}`,
          target: `${candidate.id}-${targetStage}`,
          type: "smoothstep",
          animated: sourceStatus === "completed",
          style: {
            strokeWidth: 1,
            stroke: sourceStatus === "completed" ? "#22c55e" : "#94a3b8",
          },
        })
      }
    })

    return edges
  }

  const handleAddCandidate = (newCandidate: Candidate) => {
    setCandidates([...candidates, newCandidate])
    setIsDialogOpen(false)
  }

  const handleUpdateStageStatus = (
    candidateId: string,
    stageId: string,
    status: "pending" | "ongoing" | "completed",
  ) => {
    setCandidates(
      candidates.map((candidate) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            stageStatuses: {
              ...candidate.stageStatuses,
              [stageId]: {
                ...candidate.stageStatuses[stageId],
                status,
              },
            },
          }
        }
        return candidate
      }),
    )
  }

  const handleMoveToNextStage = (candidateId: string) => {
    setCandidates(
      candidates.map((candidate) => {
        if (candidate.id === candidateId) {
          const currentStageIndex = stages.findIndex((stage) => stage.id === candidate.currentStage)

          if (currentStageIndex < stages.length - 1) {
            const nextStageId = stages[currentStageIndex + 1].id

            return {
              ...candidate,
              currentStage: nextStageId,
              stageStatuses: {
                ...candidate.stageStatuses,
                [candidate.currentStage]: {
                  ...candidate.stageStatuses[candidate.currentStage],
                  status: "completed",
                },
                [nextStageId]: {
                  ...candidate.stageStatuses[nextStageId],
                  status: "ongoing",
                  date: new Date().toISOString().split("T")[0],
                },
              },
            }
          }
        }
        return candidate
      }),
    )
  }

  return (
    <div className="h-[600px] border rounded-lg">
      <ReactFlow
        nodes={createNodes()}
        edges={createEdges()}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
      >
        <Background color="#94a3b8" gap={16} />
        <Controls />
        <Panel position="top-right">
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </Panel>
      </ReactFlow>

      <AddCandidateDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddCandidate={handleAddCandidate}
        stages={stages}
      />
    </div>
  )
}

