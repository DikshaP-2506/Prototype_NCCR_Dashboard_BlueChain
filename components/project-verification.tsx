"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  FileText,
  Satellite,
  Bone as Drone,
  Database,
  Brain,
  Upload,
  CheckCircle,
  PlayCircle,
  LogOut,
  MapPin,
} from "lucide-react"

interface ProjectVerificationProps {
  projectId: string
  onBack: () => void
  onLogout: () => void
}

export function ProjectVerification({ projectId, onBack, onLogout }: ProjectVerificationProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [verificationReport, setVerificationReport] = useState("")
  const [verifiedCO2e, setVerifiedCO2e] = useState("")
  const [outcome, setOutcome] = useState("")

  // Mock project data
  const projectData = {
    id: projectId,
    name: "Sundarbans Mangrove Restoration",
    location: "West Bengal, India",
    coordinates: "21.9497° N, 88.9468° E",
    area: "2,450 hectares",
    startDate: "2023-06-01",
    estimatedCO2e: "12,500 tons",
    status: "verification-pending",
    projectLead: "Dr. Rajesh Kumar",
    organization: "West Bengal Forest Department",
  }

  const aiValidationData = [
    {
      type: "Field Data Validation",
      confidence: 94,
      status: "verified",
      flags: 0,
      description: "Field measurements consistent with satellite observations",
    },
    {
      type: "Satellite Analysis",
      confidence: 87,
      status: "warning",
      flags: 1,
      description: "Minor discrepancy in canopy coverage estimates detected",
    },
    {
      type: "Drone Survey Validation",
      confidence: 96,
      status: "verified",
      flags: 0,
      description: "High-resolution imagery confirms restoration progress",
    },
    {
      type: "Carbon Sequestration Model",
      confidence: 89,
      status: "warning",
      flags: 1,
      description: "Model predictions within acceptable range but require review",
    },
  ]

  const handleSubmitReport = () => {
    // Handle verification report submission
    console.log("Submitting verification report:", {
      projectId,
      report: verificationReport,
      verifiedCO2e,
      outcome,
    })
    alert("Verification report submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-xl font-bold">Project Verification</h1>
              <p className="text-sm text-muted-foreground">{projectData.name}</p>
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

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Project Overview</TabsTrigger>
            <TabsTrigger value="mrv-data">MRV Data</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="report">Verification Report</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Project Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Project Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Project ID</Label>
                      <p className="text-lg font-mono">{projectData.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <p>{projectData.location}</p>
                      <p className="text-sm text-muted-foreground">{projectData.coordinates}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Project Area</Label>
                      <p>{projectData.area}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                      <p>{projectData.startDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Estimated CO2e</Label>
                      <p className="text-lg font-semibold text-success-green">{projectData.estimatedCO2e}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Project Lead</Label>
                      <p>{projectData.projectLead}</p>
                      <p className="text-sm text-muted-foreground">{projectData.organization}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
                  <FileText className="h-4 w-4 text-warning-amber" />
                </CardHeader>
                <CardContent>
                  <Badge className="bg-warning-amber text-black">Pending Review</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Validation</CardTitle>
                  <Brain className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91%</div>
                  <p className="text-xs text-muted-foreground">Average confidence</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                  <Database className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">Validation sources</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mrv-data" className="space-y-6">
            {/* AI Validation Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI Validation Reports</span>
                </CardTitle>
                <CardDescription>AI-driven analysis with confidence scores and anomaly detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiValidationData.map((validation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            validation.status === "verified"
                              ? "bg-success-green"
                              : validation.status === "warning"
                                ? "bg-warning-amber"
                                : "bg-error-red"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{validation.type}</h4>
                          <p className="text-sm text-muted-foreground">{validation.description}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold">{validation.confidence}%</div>
                        {validation.flags > 0 && (
                          <Badge variant="outline" className="text-warning-amber border-warning-amber">
                            {validation.flags} Flag{validation.flags > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Sources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Field Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Soil carbon measurements</p>
                    <p className="text-sm">• Tree diameter surveys</p>
                    <p className="text-sm">• Species composition data</p>
                    <p className="text-sm">• Water quality parameters</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Drone className="h-5 w-5 text-accent" />
                    <span>Drone Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• High-resolution imagery</p>
                    <p className="text-sm">• Canopy height models</p>
                    <p className="text-sm">• Vegetation indices</p>
                    <p className="text-sm">• Change detection maps</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Satellite className="h-5 w-5 text-success-green" />
                    <span>Satellite Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Landsat time series</p>
                    <p className="text-sm">• Sentinel-2 imagery</p>
                    <p className="text-sm">• NDVI trends</p>
                    <p className="text-sm">• Land cover classification</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>Review all project documentation and evidence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Project Design Document", type: "PDF", size: "2.4 MB", status: "verified" },
                    { name: "Environmental Impact Assessment", type: "PDF", size: "1.8 MB", status: "verified" },
                    { name: "Baseline Study Report", type: "PDF", size: "3.2 MB", status: "verified" },
                    { name: "Monitoring Plan", type: "PDF", size: "1.1 MB", status: "verified" },
                    { name: "Stakeholder Consultation Report", type: "PDF", size: "0.9 MB", status: "pending" },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "verified" ? "default" : "secondary"}>{doc.status}</Badge>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Report</CardTitle>
                <CardDescription>Complete your verification assessment and submit your findings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="report">Detailed Verification Report</Label>
                  <Textarea
                    id="report"
                    placeholder="Provide a comprehensive assessment of the project data, methodology, and findings..."
                    value={verificationReport}
                    onChange={(e) => setVerificationReport(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="co2e">Verified CO2e (tons)</Label>
                    <Input
                      id="co2e"
                      type="number"
                      placeholder="12500"
                      value={verifiedCO2e}
                      onChange={(e) => setVerifiedCO2e(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outcome">Verification Outcome</Label>
                    <Select value={outcome} onValueChange={setOutcome}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="verified-with-conditions">Verified with Conditions</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="requires-additional-info">Requires Additional Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleSubmitReport} disabled={!verificationReport || !verifiedCO2e || !outcome}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Verification Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
