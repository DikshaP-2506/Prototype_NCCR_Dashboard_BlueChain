"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import { ProjectOverview } from "@/components/project-overview"
import { VerifierManagement } from "@/components/verifier-management"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { DisputeResolution } from "@/components/dispute-resolution"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const summaryCards = [
    {
      title: "Projects Pending Approval",
      value: "12",
      change: "+3 from last week",
      icon: Clock,
      color: "text-warning-amber",
    },
    {
      title: "Total IBC Credits Issued",
      value: "45,230",
      change: "+2,340 this month",
      icon: CheckCircle,
      color: "text-success-green",
    },
    {
      title: "AI Flags Pending Review",
      value: "8",
      change: "2 critical alerts",
      icon: AlertTriangle,
      color: "text-error-red",
    },
    {
      title: "Active Verifiers",
      value: "24",
      change: "3 new this month",
      icon: Users,
      color: "text-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NCCR Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Blue Carbon Registry</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              Guide Video
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Impact
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-border bg-card/30 min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("projects")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Projects
            </Button>
            <Button
              variant={activeTab === "verifiers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("verifiers")}
            >
              <Users className="h-4 w-4 mr-2" />
              Verifier Management
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
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
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>New Project Proposals</span>
                    </CardTitle>
                    <CardDescription>Review and approve pending project submissions</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span>Verifier Management</span>
                    </CardTitle>
                    <CardDescription>Manage accredited verifiers and assignments</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-success-green" />
                      <span>Map View</span>
                    </CardTitle>
                    <CardDescription>Geographic overview of all projects</CardDescription>
                  </CardHeader>
                </Card>
              </div>

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

          {activeTab === "projects" && <ProjectOverview />}
          {activeTab === "verifiers" && <VerifierManagement />}
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
