import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
  variant?: "square" | "rounded"
}

export function Logo({ className, width = 32, height = 32, showText = true, variant = "rounded" }: LogoProps) {
  const imageClasses = variant === "rounded" 
    ? "object-cover rounded-full" // Changed to object-cover for better cropping
    : "object-contain rounded-lg"
  
  const wrapperClasses = variant === "rounded"
    ? "relative bg-white p-1 rounded-full shadow-sm overflow-hidden" // Added overflow-hidden
    : "relative"

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={wrapperClasses}>
        <Image
          src="/bluechain-logo.jpg"
          alt="BlueChain Logo"
          width={width}
          height={height}
          className={imageClasses}
          priority
        />
      </div>
      {showText && (
        <span className="font-bold text-lg">BlueChain</span>
      )}
    </div>
  )
}

// Fallback component if logo image is not available
export function LogoIcon({ className, size = 32 }: { className?: string, size?: number }) {
  return (
    <div className={cn("flex items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-blue-600", className)} 
         style={{ width: size, height: size }}>
      <div className="text-white font-bold text-xs">BC</div>
    </div>
  )
}