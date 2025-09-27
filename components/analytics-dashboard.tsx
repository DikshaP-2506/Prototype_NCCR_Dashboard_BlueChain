"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Leaf, Users, FileText, AlertTriangle } from "lucide-react"

export function AnalyticsDashboard() {
  const carbonSequestrationData = [
    { month: "Jan", sequestered: 4200, projected: 4000 },
    { month: "Feb", sequestered: 4800, projected: 4500 },
    { month: "Mar", sequestered: 5200, projected: 5000 },
    { month: "Apr", sequestered: 5800, projected: 5500 },
    { month: "May", sequestered: 6400, projected: 6000 },
    { month: "Jun", sequestered: 7100, projected: 6500 },
  ]

  const projectStatusData = [
    { name: "Approved", value: 45, color: "#10b981" },
    { name: "In Review", value: 23, color: "#3b82f6" },
    { name: "Verification Pending", value: 18, color: "#f59e0b" },
    { name: "Rejected", value: 8, color: "#ef4444" },
    { name: "Pending Approval", value: 12, color: "#6b7280" },
  ]

  const stateWiseData = [
    { state: "West Bengal", projects: 12, co2e: 45200 },
    { state: "Kerala", projects: 8, co2e: 32100 },
    { state: "Tamil Nadu", projects: 10, co2e: 38900 },
    { state: "Gujarat", projects: 6, co2e: 24800 },
    { state: "Odisha", projects: 4, co2e: 18500 },
  ]

  const auditLogData = [
    {
      id: "TXN-001",
      type: "Project Approval",
      project: "MNG-2024-001",
      user: "Admin",
      timestamp: "2024-01-15 14:30",
      status: "success",
    },
    {
      id: "TXN-002",
      type: "Verification Report",
      project: "KER-2024-003",
      user: "Dr. Priya Sharma",
      timestamp: "2024-01-15 12:15",
      status: "success",
    },
    {
      id: "TXN-003",
      type: "Credit Issuance",
      project: "TN-2024-002",
      user: "System",
      timestamp: "2024-01-15 10:45",
      status: "success",
    },
    {
      id: "TXN-004",
      type: "AI Flag Alert",
      project: "GUJ-2024-004",
      user: "AI System",
      timestamp: "2024-01-15 09:20",
      status: "warning",
    },
    {
      id: "TXN-005",
      type: "Dispute Resolution",
      project: "OR-2024-001",
      user: "Admin",
      timestamp: "2024-01-14 16:30",
      status: "resolved",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive system analytics and audit trails</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CO2e Sequestered</CardTitle>
            <Leaf className="h-4 w-4 text-success-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-green">159,500</div>
            <p className="text-xs text-muted-foreground">tons CO2e</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">106</div>
            <p className="text-xs text-muted-foreground">across 5 states</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Projects</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">73% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Anomalies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">requiring review</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Sequestration Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Sequestration Trend</CardTitle>
            <CardDescription>Monthly CO2e sequestration vs projections</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonSequestrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sequestered" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="projected" stroke="#6b7280" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* State-wise Performance */}
      <Card>
        <CardHeader>
          <CardTitle>State-wise Performance</CardTitle>
          <CardDescription>Project distribution and CO2e sequestration by state</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="projects" fill="#3b82f6" />
              <Bar yAxisId="right" dataKey="co2e" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>System Audit Log</CardTitle>
          <CardDescription>Recent blockchain transactions and system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLogData.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      log.status === "success"
                        ? "bg-success-green"
                        : log.status === "warning"
                          ? "bg-warning-amber"
                          : log.status === "resolved"
                            ? "bg-primary"
                            : "bg-error-red"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{log.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.project} • {log.user} • {log.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {log.id}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
