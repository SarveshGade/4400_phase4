"use client"

import { Button } from "@/components/ui/button"
import { airlineApi } from "@/lib/api"

export default function Simulation() {
  const handleSimulationCycle = async () => {
    try {
      await airlineApi.simulationCycle()
    } catch (error) {
      console.error("Failed to execute simulation cycle:", error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Simulation</h2>
      <Button onClick={handleSimulationCycle}>Run Simulation Cycle</Button>
    </div>
  )
}
