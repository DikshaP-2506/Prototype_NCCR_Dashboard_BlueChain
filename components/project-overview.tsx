"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function ProjectOverview() {
  const projects = [
    {
      id: "MNG-2024-001",
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal",
      status: "verification-pending",
      co2e: "12,500 tons",
      verifier: "Dr. Priya Sharma",
      progress: 75,
      aiFlags: 2,
      lastUpdate: "2024-01-15",
    },
    {
      id: "KER-2024-003",
      name: "Backwater Ecosystem Recovery",
      location: "Kerala",
      status: "approved",
      co2e: "8,750 tons",
      verifier: "Dr. Rajesh Kumar",
      progress: 100,
      aiFlags: 0,
      lastUpdate: "2024-01-12",
    },
    {
      id: "TN-2024-002",
      name: "Pichavaram Mangrove Conservation",
      location: "Tamil Nadu",
      status: "in-review",
      co2e: "15,200 tons",
      verifier: "Dr. Meera Nair",
      progress: 45,
      aiFlags: 1,
      lastUpdate: "2024-01-10",
    },
    {
      id: "GUJ-2024-004",
      name: "Kutch Mangrove Expansion",
      location: "Gujarat",
      status: "pending-approval",
      co2e: "9,800 tons",
      verifier: "Unassigned",
      progress: 20,
      aiFlags: 0,
      lastUpdate: "2024-01-08",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success-green text-white"
      case "verification-pending":
        return "bg-warning-amber text-black"
      case "in-review":
        return "bg-primary text-primary-foreground"
      case "pending-approval":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle
      case "verification-pending":
        return Eye
      case "in-review":
        return Clock
      case "pending-approval":
        return AlertTriangle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">Monitor and manage all blue carbon projects</p>
        </div>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="verification-pending">Verification Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="pending-approval">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="west-bengal">West Bengal</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const StatusIcon = getStatusIcon(project.status)
          return (
            <Card key={project.id} className="hover:bg-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                      {project.aiFlags > 0 && (
                        <Badge variant="outline" className="text-warning-amber border-warning-amber">
                          {project.aiFlags} AI Flag{project.aiFlags > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Project ID</p>
                        <p className="font-mono">{project.id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p>{project.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estimated CO2e</p>
                        <p className="font-semibold text-success-green">{project.co2e}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Verifier</p>
                        <p>{project.verifier}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Updated {project.lastUpdate}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {project.status === "pending-approval" && (
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
