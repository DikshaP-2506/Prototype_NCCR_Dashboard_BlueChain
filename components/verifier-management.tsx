"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, UserCheck, UserX, Eye, Mail, Phone, MapPin, Award } from "lucide-react"

export function VerifierManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const verifiers = [
    {
      id: "VER-001",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@nccr.gov.in",
      phone: "+91 98765 43210",
      specialization: "Mangrove Ecosystems",
      location: "Chennai, Tamil Nadu",
      status: "active",
      accreditationDate: "2023-01-15",
      projectsAssigned: 5,
      projectsCompleted: 23,
      rating: 4.8,
    },
    {
      id: "VER-002",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@forestdept.gov.in",
      phone: "+91 98765 43211",
      specialization: "Carbon Sequestration",
      location: "Kolkata, West Bengal",
      status: "active",
      accreditationDate: "2023-02-20",
      projectsAssigned: 3,
      projectsCompleted: 18,
      rating: 4.6,
    },
    {
      id: "VER-003",
      name: "Dr. Meera Nair",
      email: "meera.nair@kerala.gov.in",
      phone: "+91 98765 43212",
      specialization: "Coastal Restoration",
      location: "Kochi, Kerala",
      status: "active",
      accreditationDate: "2023-03-10",
      projectsAssigned: 4,
      projectsCompleted: 15,
      rating: 4.9,
    },
    {
      id: "VER-004",
      name: "Dr. Arun Patel",
      email: "arun.patel@gujarat.gov.in",
      phone: "+91 98765 43213",
      specialization: "Remote Sensing",
      location: "Gandhinagar, Gujarat",
      status: "suspended",
      accreditationDate: "2022-11-05",
      projectsAssigned: 0,
      projectsCompleted: 12,
      rating: 4.2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-green text-white"
      case "suspended":
        return "bg-error-red text-white"
      case "pending":
        return "bg-warning-amber text-black"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Verifier Management</h2>
          <p className="text-muted-foreground">Manage accredited verifiers and their assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Verifier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Verifier</DialogTitle>
              <DialogDescription>Add a new accredited verifier to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Dr. John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialization" className="text-right">
                  Specialization
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mangrove">Mangrove Ecosystems</SelectItem>
                    <SelectItem value="carbon">Carbon Sequestration</SelectItem>
                    <SelectItem value="coastal">Coastal Restoration</SelectItem>
                    <SelectItem value="remote-sensing">Remote Sensing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Verifier</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search verifiers..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="mangrove">Mangrove Ecosystems</SelectItem>
                <SelectItem value="carbon">Carbon Sequestration</SelectItem>
                <SelectItem value="coastal">Coastal Restoration</SelectItem>
                <SelectItem value="remote-sensing">Remote Sensing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Verifiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verifiers.map((verifier) => (
          <Card key={verifier.id} className="hover:bg-accent/30 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{verifier.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <span>{verifier.id}</span>
                    <Badge className={getStatusColor(verifier.status)}>{verifier.status}</Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-warning-amber" />
                  <span className="text-sm font-medium">{verifier.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{verifier.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{verifier.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{verifier.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Specialization</p>
                  <p className="font-medium">{verifier.specialization}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Accredited</p>
                  <p className="font-medium">{verifier.accreditationDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned</p>
                  <p className="font-medium">{verifier.projectsAssigned} projects</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completed</p>
                  <p className="font-medium">{verifier.projectsCompleted} projects</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Assign Project
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  {verifier.status === "active" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-error-red border-error-red hover:bg-error-red hover:text-white bg-transparent"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-success-green border-success-green hover:bg-success-green hover:text-white bg-transparent"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
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
