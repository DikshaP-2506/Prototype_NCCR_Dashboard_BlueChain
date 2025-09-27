"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { UnifiedDashboard } from "@/components/unified-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <UnifiedDashboard onLogout={handleLogout} />
}
