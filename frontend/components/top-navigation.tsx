"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Section = "add-entities" | "manage-flights" | "simulation" | "views"

interface TopNavigationProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

export default function TopNavigation({ activeSection, setActiveSection }: TopNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "add-entities", label: "Add Entities" },
    { id: "manage-flights", label: "Manage Flights" },
    { id: "simulation", label: "Simulation" },
    { id: "views", label: "Views" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold mr-8">Airline Management</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id as Section)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
