"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, CheckCircle, AlertTriangle, PlayCircle, LogOut } from "lucide-react"
import { ProjectVerification } from "@/components/project-verification"

interface VerifierDashboardProps {
  onLogout: () => void
}

export function VerifierDashboard({ onLogout }: VerifierDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const assignedProjects = [
    {
      id: "MNG-2024-001",
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal",
      status: "verification-pending",
      assignedDate: "2024-01-15",
      deadline: "2024-02-15",
      co2e: "12,500 tons",
      aiFlags: 2,
    },
    {
      id: "KER-2024-003",
      name: "Backwater Ecosystem Recovery",
      location: "Kerala",
      status: "in-progress",
      assignedDate: "2024-01-10",
      deadline: "2024-02-10",
      co2e: "8,750 tons",
      aiFlags: 0,
    },
    {
      id: "TN-2024-002",
      name: "Pichavaram Mangrove Conservation",
      location: "Tamil Nadu",
      status: "completed",
      assignedDate: "2023-12-01",
      deadline: "2024-01-01",
      co2e: "15,200 tons",
      aiFlags: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verification-pending":
        return "bg-warning-amber text-black"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "completed":
        return "bg-success-green text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "verification-pending":
        return "Pending Review"
      case "in-progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  if (activeView === "verification" && selectedProject) {
    return (
      <ProjectVerification
        projectId={selectedProject}
        onBack={() => {
          setActiveView("dashboard")
          setSelectedProject(null)
        }}
        onLogout={onLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Verifier Dashboard</h1>
                <p className="text-sm text-muted-foreground">Project Verification Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              Guide Video
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="slide-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Assigned Projects</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedProjects.length}</div>
              <p className="text-xs text-muted-foreground">2 pending verification</p>
            </CardContent>
          </Card>

          <Card className="slide-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verifications Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-success-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="slide-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Flags to Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning-amber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Across 2 projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Projects */}
        <Card>
          <CardHeader>
            <CardTitle>My Assigned Projects</CardTitle>
            <CardDescription>Projects requiring your verification and assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                      {project.aiFlags > 0 && (
                        <Badge variant="outline" className="text-warning-amber border-warning-amber">
                          {project.aiFlags} AI Flag{project.aiFlags > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>ID: {project.id}</span>
                      <span>Location: {project.location}</span>
                      <span>CO2e: {project.co2e}</span>
                      <span>Deadline: {project.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {project.status === "verification-pending" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project.id)
                          setActiveView("verification")
                        }}
                      >
                        Start Verification
                      </Button>
                    )}
                    {project.status === "in-progress" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project.id)
                          setActiveView("verification")
                        }}
                      >
                        Continue Review
                      </Button>
                    )}
                    {project.status === "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project.id)
                          setActiveView("verification")
                        }}
                      >
                        View Report
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Verification Requests</CardTitle>
            <CardDescription>New projects assigned for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "GUJ-2024-004", name: "Kutch Mangrove Expansion", time: "2 hours ago", urgent: true },
                { id: "OR-2024-001", name: "Chilika Lake Restoration", time: "1 day ago", urgent: false },
                { id: "AP-2024-002", name: "Krishna Delta Conservation", time: "3 days ago", urgent: false },
              ].map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-2 w-2 rounded-full ${request.urgent ? "bg-error-red pulse-glow" : "bg-primary"}`}
                    />
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {request.id} • {request.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
