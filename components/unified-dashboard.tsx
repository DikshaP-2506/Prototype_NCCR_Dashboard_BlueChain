"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-provider"
import { Logo } from "@/components/ui/logo"
import {
  Shield,
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Share2,
  PlayCircle,
  LogOut,
  Settings,
  BarChart3,
  Gavel,
  Eye,
} from "lucide-react"
import { ProjectOverview } from "@/components/project-overview"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { DisputeResolution } from "@/components/dispute-resolution"
import { ProjectVerification } from "@/components/project-verification"

interface UnifiedDashboardProps {
  onLogout: () => void
}

export function UnifiedDashboard({ onLogout }: UnifiedDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const summaryCards = [
    {
      title: "Projects Pending Verification",
      value: "12",
      change: "+3 from last week",
      icon: Clock,
      color: "text-warning-amber",
    },
    {
      title: "Total IBC Credits Verified",
      value: "45,230",
      change: "+2,340 this month",
      icon: CheckCircle,
      color: "text-success-green",
    },
    {
      title: "AI Flags Requiring Review",
      value: "8",
      change: "2 critical alerts",
      icon: AlertTriangle,
      color: "text-error-red",
    },
    {
      title: "Projects Under Review",
      value: "24",
      change: "3 new this month",
      icon: Users,
      color: "text-primary",
    },
  ]

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

  if (activeTab === "verification" && selectedProject) {
    return (
      <ProjectVerification
        projectId={selectedProject}
        onBack={() => {
          setActiveTab("overview")
          setSelectedProject(null)
        }}
        onLogout={onLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Dark Navy Blue */}
      <header className="border-b border-sidebar-border bg-sidebar backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Logo width={40} height={40} showText={false} variant="rounded" className="text-sidebar-primary" />
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">NCCR Verifier Dashboard</h1>
                <p className="text-sm text-sidebar-foreground/70">Blue Carbon Project Verification System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle className="text-sidebar-foreground hover:bg-sidebar-accent" />
            <Button variant="outline" size="sm" className="border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80">
              <PlayCircle className="h-4 w-4 mr-2" />
              Guide Video
            </Button>
            <Button variant="outline" size="sm" className="border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80">
              <Share2 className="h-4 w-4 mr-2" />
              Share Impact
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Bright theme */}
        <nav className="w-64 border-r border-border bg-card/80 min-h-[calc(100vh-5rem)]">
          <div className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard Overview
            </Button>
            <Button
              variant={activeTab === "verification" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("verification")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Project Verification
            </Button>
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("projects")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Project Management
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Verification Analytics
            </Button>
            <Button
              variant={activeTab === "disputes" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("disputes")}
            >
              <Gavel className="h-4 w-4 mr-2" />
              Dispute Resolution
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, index) => (
                  <Card key={index} className="slide-in">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <card.icon className={`h-4 w-4 ${card.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{card.value}</div>
                      <p className="text-xs text-muted-foreground">{card.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setActiveTab("verification")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <span>Start Verification</span>
                    </CardTitle>
                    <CardDescription>Begin verification process for pending projects</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setActiveTab("projects")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-accent" />
                      <span>Project Management</span>
                    </CardTitle>
                    <CardDescription>Review and manage project submissions</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-success-green" />
                      <span>Verification Map</span>
                    </CardTitle>
                    <CardDescription>Geographic view of verification activities</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* My Assigned Projects for Verification */}
              <Card>
                <CardHeader>
                  <CardTitle>My Verification Queue</CardTitle>
                  <CardDescription>Projects assigned for verification and assessment</CardDescription>
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
                                setActiveTab("verification")
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
                                setActiveTab("verification")
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
                                setActiveTab("verification")
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

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system updates and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "alert",
                        message: "AI anomaly detected in Project MNG-2024-001",
                        time: "2 hours ago",
                        severity: "high",
                      },
                      {
                        type: "approval",
                        message: "Project KER-2024-003 approved for verification",
                        time: "4 hours ago",
                        severity: "normal",
                      },
                      {
                        type: "verifier",
                        message: "New verifier Dr. Priya Sharma accredited",
                        time: "1 day ago",
                        severity: "normal",
                      },
                      {
                        type: "credit",
                        message: "1,250 IBC credits issued for Project TN-2024-002",
                        time: "2 days ago",
                        severity: "normal",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            activity.severity === "high" ? "bg-error-red" : "bg-success-green"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "verification" && !selectedProject && (
            <Card>
              <CardHeader>
                <CardTitle>Project Verification Center</CardTitle>
                <CardDescription>Select a project from your queue to begin verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedProjects
                    .filter((p) => p.status !== "completed")
                    .map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedProject(project.id)}
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
                        <Button>
                          {project.status === "verification-pending" ? "Start Verification" : "Continue Review"}
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "projects" && <ProjectOverview />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "disputes" && <DisputeResolution />}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure dashboard preferences and system parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
