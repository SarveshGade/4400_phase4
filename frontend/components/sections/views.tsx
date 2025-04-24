"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FlightsInAirTable from "@/components/tables/flights-in-air-table"
import FlightsOnGroundTable from "@/components/tables/flights-on-ground-table"
import PeopleInAirTable from "@/components/tables/people-in-air-table"
import PeopleOnGroundTable from "@/components/tables/people-on-ground-table"
import RouteSummaryTable from "@/components/tables/route-summary-table"
import AlternativeAirportsTable from "@/components/tables/alternative-airports-table"

export default function Views() {
  const [activeTab, setActiveTab] = useState("flights-air")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Views</h2>
      <Tabs defaultValue="flights-air" className="w-full" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="flights-air">Flights in Air</TabsTrigger>
          <TabsTrigger value="flights-ground">Flights on Ground</TabsTrigger>
          <TabsTrigger value="people-air">People in Air</TabsTrigger>
        </TabsList>
        <TabsList className="mt-2 grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="people-ground">People on Ground</TabsTrigger>
          <TabsTrigger value="route-summary">Route Summary</TabsTrigger>
          <TabsTrigger value="alternative-airports">Alternative Airports</TabsTrigger>
        </TabsList>
        <TabsContent value="flights-air" key={`flights-air-${refreshKey}`}>
          <FlightsInAirTable />
        </TabsContent>
        <TabsContent value="flights-ground" key={`flights-ground-${refreshKey}`}>
          <FlightsOnGroundTable />
        </TabsContent>
        <TabsContent value="people-air" key={`people-air-${refreshKey}`}>
          <PeopleInAirTable />
        </TabsContent>
        <TabsContent value="people-ground" key={`people-ground-${refreshKey}`}>
          <PeopleOnGroundTable />
        </TabsContent>
        <TabsContent value="route-summary" key={`route-summary-${refreshKey}`}>
          <RouteSummaryTable />
        </TabsContent>
        <TabsContent value="alternative-airports" key={`alternative-airports-${refreshKey}`}>
          <AlternativeAirportsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
