"use client"

import { useState } from "react"
import TopNavigation from "@/components/top-navigation"
import AddEntities from "@/components/sections/add-entities"
import ManageFlights from "@/components/sections/manage-flights"
import Simulation from "@/components/sections/simulation"
import Views from "@/components/sections/views"

type Section = "add-entities" | "manage-flights" | "simulation" | "views"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("add-entities")

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="bg-card rounded-lg shadow-sm p-6">
          {activeSection === "add-entities" && <AddEntities />}
          {activeSection === "manage-flights" && <ManageFlights />}
          {activeSection === "simulation" && <Simulation />}
          {activeSection === "views" && <Views />}
        </div>
      </main>
    </div>
  )
}
