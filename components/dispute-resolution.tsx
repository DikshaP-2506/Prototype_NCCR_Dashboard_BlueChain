"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Gavel, AlertTriangle, Clock, CheckCircle, Eye, FileText } from "lucide-react"

export function DisputeResolution() {
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null)
  const [resolution, setResolution] = useState("")
  const [resolutionType, setResolutionType] = useState("")

  const disputes = [
    {
      id: "DSP-001",
      projectId: "MNG-2024-001",
      projectName: "Sundarbans Mangrove Restoration",
      type: "Data Verification",
      status: "active",
      priority: "high",
      submittedBy: "Dr. Priya Sharma",
      submittedDate: "2024-01-10",
      description: "Discrepancy in field data measurements vs satellite observations",
      aiFlags: 2,
      evidence: ["Field measurement logs", "Satellite imagery analysis", "AI validation report"],
    },
    {
      id: "DSP-002",
      projectId: "KER-2024-003",
      projectName: "Backwater Ecosystem Recovery",
      type: "Methodology Dispute",
      status: "under-review",
      priority: "medium",
      submittedBy: "Dr. Rajesh Kumar",
      submittedDate: "2024-01-08",
      description: "Questioning the carbon sequestration calculation methodology",
      aiFlags: 0,
      evidence: ["Methodology documentation", "Calculation worksheets", "Peer review comments"],
    },
    {
      id: "DSP-003",
      projectId: "TN-2024-002",
      projectName: "Pichavaram Mangrove Conservation",
      type: "Boundary Dispute",
      status: "resolved",
      priority: "low",
      submittedBy: "Local Community Rep",
      submittedDate: "2024-01-05",
      description: "Disagreement on project boundary demarcation",
      aiFlags: 1,
      evidence: ["GPS coordinates", "Land records", "Community consultation notes"],
      resolution: "Boundary adjusted based on community input and legal verification",
      resolvedDate: "2024-01-12",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-error-red text-white"
      case "under-review":
        return "bg-warning-amber text-black"
      case "resolved":
        return "bg-success-green text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-error-red"
      case "medium":
        return "text-warning-amber"
      case "low":
        return "text-success-green"
      default:
        return "text-muted-foreground"
    }
  }

  const handleResolveDispute = (disputeId: string) => {
    console.log("Resolving dispute:", disputeId, { resolution, resolutionType })
    alert("Dispute resolved successfully!")
    setResolution("")
    setResolutionType("")
    setSelectedDispute(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dispute Resolution</h2>
          <p className="text-muted-foreground">Manage and resolve project disputes and conflicts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-error-red border-error-red">
            {disputes.filter((d) => d.status === "active").length} Active Disputes
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-error-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-error-red">
              {disputes.filter((d) => d.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-warning-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-amber">
              {disputes.filter((d) => d.status === "under-review").length}
            </div>
            <p className="text-xs text-muted-foreground">Being investigated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-green">
              {disputes.filter((d) => d.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Gavel className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((dispute) => (
          <Card key={dispute.id} className="hover:bg-accent/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <Gavel className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{dispute.projectName}</h3>
                    <Badge className={getStatusColor(dispute.status)}>{dispute.status.replace("-", " ")}</Badge>
                    <Badge variant="outline" className={getPriorityColor(dispute.priority)}>
                      {dispute.priority} priority
                    </Badge>
                    {dispute.aiFlags > 0 && (
                      <Badge variant="outline" className="text-warning-amber border-warning-amber">
                        {dispute.aiFlags} AI Flag{dispute.aiFlags > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dispute ID</p>
                      <p className="font-mono">{dispute.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p>{dispute.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Submitted By</p>
                      <p>{dispute.submittedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p>{dispute.submittedDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-sm text-muted-foreground">{dispute.description}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Evidence:</p>
                    <div className="flex flex-wrap gap-2">
                      {dispute.evidence.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {dispute.status === "resolved" && dispute.resolution && (
                    <div className="space-y-2 p-3 bg-success-green/10 rounded-lg border border-success-green/20">
                      <p className="text-sm font-medium text-success-green">Resolution:</p>
                      <p className="text-sm">{dispute.resolution}</p>
                      <p className="text-xs text-muted-foreground">Resolved on {dispute.resolvedDate}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>

                  {dispute.status !== "resolved" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => setSelectedDispute(dispute.id)}>
                          <Gavel className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Resolve Dispute</DialogTitle>
                          <DialogDescription>Provide resolution details for dispute {dispute.id}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Resolution Type</Label>
                            <Select value={resolutionType} onValueChange={setResolutionType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select resolution type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="accepted">Accept Dispute - Modify Project</SelectItem>
                                <SelectItem value="rejected">Reject Dispute - No Changes</SelectItem>
                                <SelectItem value="partial">Partial Resolution - Compromise</SelectItem>
                                <SelectItem value="escalated">Escalate to Higher Authority</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Resolution Details</Label>
                            <Textarea
                              placeholder="Provide detailed explanation of the resolution..."
                              value={resolution}
                              onChange={(e) => setResolution(e.target.value)}
                              className="min-h-[120px]"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button
                            onClick={() => handleResolveDispute(dispute.id)}
                            disabled={!resolution || !resolutionType}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Resolution
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
