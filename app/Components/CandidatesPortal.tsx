"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for company roles
const companyRoles = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Design" },
  { id: 3, name: "Product" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "Sales" },
  { id: 6, name: "Data" },
]

// Mock data for job descriptions by role
const jobDescriptionsByRole = {
  1: [
    // Engineering
    { id: 101, title: "Frontend Developer (React)", matches: 24 },
    { id: 102, title: "Backend Developer (Node.js)", matches: 18 },
    { id: 103, title: "Full Stack Engineer", matches: 22 },
    { id: 104, title: "DevOps Engineer", matches: 12 },
    { id: 105, title: "Mobile Developer (React Native)", matches: 15 },
    { id: 106, title: "QA Engineer", matches: 9 },
    { id: 107, title: "Software Architect", matches: 7 },
    { id: 108, title: "Embedded Systems Engineer", matches: 5 },
    { id: 109, title: "Security Engineer", matches: 8 },
    { id: 110, title: "Machine Learning Engineer", matches: 11 },
    { id: 111, title: "Blockchain Developer", matches: 6 },
    { id: 112, title: "Game Developer", matches: 10 },
  ],
  2: [
    // Design
    { id: 201, title: "UX Designer", matches: 19 },
    { id: 202, title: "UI Designer", matches: 21 },
    { id: 203, title: "Graphic Designer", matches: 14 },
    { id: 204, title: "Product Designer", matches: 17 },
    { id: 205, title: "Motion Designer", matches: 8 },
    { id: 206, title: "3D Designer", matches: 6 },
    { id: 207, title: "Interaction Designer", matches: 12 },
    { id: 208, title: "Design Systems Specialist", matches: 9 },
    { id: 209, title: "Visual Designer", matches: 15 },
    { id: 210, title: "Brand Designer", matches: 11 },
    { id: 211, title: "Illustrator", matches: 7 },
    { id: 212, title: "Design Researcher", matches: 10 },
  ],
  3: [
    // Product
    { id: 301, title: "Product Manager", matches: 16 },
    { id: 302, title: "Product Owner", matches: 14 },
    { id: 303, title: "Technical Product Manager", matches: 12 },
    { id: 304, title: "Associate Product Manager", matches: 18 },
    { id: 305, title: "Senior Product Manager", matches: 9 },
    { id: 306, title: "Product Analyst", matches: 11 },
    { id: 307, title: "Product Marketing Manager", matches: 13 },
    { id: 308, title: "Growth Product Manager", matches: 8 },
    { id: 309, title: "Product Operations Manager", matches: 7 },
    { id: 310, title: "Product Strategy Manager", matches: 10 },
    { id: 311, title: "Product Director", matches: 5 },
    { id: 312, title: "Product Specialist", matches: 15 },
  ],
  4: [
    // Marketing
    { id: 401, title: "Digital Marketing Specialist", matches: 20 },
    { id: 402, title: "Content Marketer", matches: 18 },
    { id: 403, title: "SEO Specialist", matches: 15 },
    { id: 404, title: "Social Media Manager", matches: 22 },
    { id: 405, title: "Marketing Analyst", matches: 12 },
    { id: 406, title: "Brand Manager", matches: 14 },
    { id: 407, title: "Email Marketing Specialist", matches: 16 },
    { id: 408, title: "Growth Marketer", matches: 19 },
    { id: 409, title: "Marketing Automation Specialist", matches: 11 },
    { id: 410, title: "Copywriter", matches: 17 },
    { id: 411, title: "PR Specialist", matches: 9 },
    { id: 412, title: "Marketing Coordinator", matches: 13 },
  ],
  5: [
    // Sales
    { id: 501, title: "Sales Representative", matches: 25 },
    { id: 502, title: "Account Executive", matches: 22 },
    { id: 503, title: "Sales Development Rep", matches: 19 },
    { id: 504, title: "Sales Manager", matches: 15 },
    { id: 505, title: "Customer Success Manager", matches: 18 },
    { id: 506, title: "Enterprise Sales Executive", matches: 12 },
    { id: 507, title: "Sales Operations Analyst", matches: 14 },
    { id: 508, title: "Inside Sales Representative", matches: 21 },
    { id: 509, title: "Sales Engineer", matches: 16 },
    { id: 510, title: "Channel Sales Manager", matches: 11 },
    { id: 511, title: "Business Development Rep", matches: 17 },
    { id: 512, title: "Account Manager", matches: 20 },
  ],
  6: [
    // Data
    { id: 601, title: "Data Scientist", matches: 17 },
    { id: 602, title: "Data Analyst", matches: 23 },
    { id: 603, title: "Data Engineer", matches: 19 },
    { id: 604, title: "Business Intelligence Analyst", matches: 15 },
    { id: 605, title: "Database Administrator", matches: 12 },
    { id: 606, title: "Big Data Engineer", matches: 9 },
    { id: 607, title: "Machine Learning Scientist", matches: 11 },
    { id: 608, title: "Analytics Engineer", matches: 14 },
    { id: 609, title: "Research Scientist", matches: 8 },
    { id: 610, title: "Statistician", matches: 13 },
    { id: 611, title: "Data Architect", matches: 10 },
    { id: 612, title: "Data Visualization Specialist", matches: 16 },
  ],
}

// Mock data for candidates
const generateCandidates = (jobId: number) => {
  const baseData = [
    { id: 1, name: "Alex Johnson", summary: "5 years of React experience, worked at tech startups" },
    { id: 2, name: "Sam Williams", summary: "Full-stack developer with 3 years Node.js experience" },
    { id: 3, name: "Jamie Smith", summary: "Senior developer with 7 years experience in web technologies" },
    { id: 4, name: "Taylor Brown", summary: "Frontend specialist with design background" },
    { id: 5, name: "Morgan Davis", summary: "Computer science graduate with internship experience" },
    { id: 6, name: "Casey Wilson", summary: "Mid-level developer with React and Vue experience" },
    { id: 7, name: "Jordan Miller", summary: "Backend developer specializing in Python and databases" },
    { id: 8, name: "Riley Thompson", summary: "Full-stack developer with AWS certification" },
  ]

  // Generate random scores based on job ID to simulate different matches
  return baseData.map((candidate) => ({
    ...candidate,
    score: Math.floor(60 + Math.random() * 40), // Random score between 60-99
  }))
}

export default function CandidatePortal() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [candidates, setCandidates] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [scoreFilter, setScoreFilter] = useState<number>(0)
  const [appliedScoreFilter, setAppliedScoreFilter] = useState<number>(0)

  // Update chart data when role changes
  useEffect(() => {
    if (selectedRole) {
      const roleId = Number.parseInt(selectedRole)
      setChartData(jobDescriptionsByRole[roleId as keyof typeof jobDescriptionsByRole] || [])
      setSelectedJob(null)
      setCandidates([])
    }
  }, [selectedRole])

  // Handle chart bar click
  const handleBarClick = (data: any) => {
    const jobId = data.id
    setSelectedJob(jobId)
    setCandidates(generateCandidates(jobId))
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Filter and sort candidates based on score
  const filteredAndSortedCandidates = [...candidates]
    .filter((candidate) => candidate.score >= appliedScoreFilter)
    .sort((a, b) => {
      return sortDirection === "asc" ? a.score - b.score : b.score - a.score
    })

  // Get selected job title
  const getSelectedJobTitle = () => {
    if (!selectedJob) return "Select a job from the chart"
    const roleId = Number.parseInt(selectedRole)
    const jobs = jobDescriptionsByRole[roleId as keyof typeof jobDescriptionsByRole] || []
    return jobs.find((job) => job.id === selectedJob)?.title || ""
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Candidate Portal</h1>

      {/* Role Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Role</CardTitle>
          <CardDescription>Choose a role to see related job descriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {companyRoles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Job Description to Resume Matches</CardTitle>
          <CardDescription>
            {selectedRole
              ? "Click on a bar to see matching candidates for that job description"
              : "Please select a role first to see job descriptions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedRole ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="title"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 10 }}
                    interval={0}
                  />
                  <YAxis label={{ value: "Matches", angle: -90, position: "insideLeft", fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="matches"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                    cursor="pointer"
                    onClick={handleBarClick}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Please select a role to view job descriptions
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Matching Candidates</CardTitle>
              <CardDescription>
                {selectedJob
                  ? `Showing candidates matching "${getSelectedJobTitle()}" job description`
                  : "Select a job description from the chart above to see matching candidates"}
              </CardDescription>
            </div>
            {candidates.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={scoreFilter}
                    onChange={(e) => setScoreFilter(Number.parseInt(e.target.value) || 0)}
                    className="w-16 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                    placeholder="Score"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAppliedScoreFilter(scoreFilter)}
                    className="ml-2"
                  >
                    Filter
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={toggleSortDirection} className="flex items-center gap-1">
                  Sort
                  {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredAndSortedCandidates.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate Name</TableHead>
                    <TableHead className="hidden md:table-cell">Resume Summary</TableHead>
                    <TableHead className="text-right">Match Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{candidate.summary}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            candidate.score >= 90
                              ? "bg-green-100 text-green-800"
                              : candidate.score >= 75
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {candidate.score}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : candidates.length > 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No candidates match the minimum score of {appliedScoreFilter}%
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {selectedRole
                ? "Select a job description from the chart to view matching candidates"
                : "Please select a role first, then a job description"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

