"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OfferFlightForm from "@/components/forms/offer-flight-form"
import AssignPilotForm from "@/components/forms/assign-pilot-form"
import BoardPassengersForm from "@/components/forms/board-passengers-form"
import DisembarkPassengersForm from "@/components/forms/disembark-passengers-form"
import FlightTakeoffForm from "@/components/forms/flight-takeoff-form"
import FlightLandingForm from "@/components/forms/flight-landing-form"
import RecycleCrewForm from "@/components/forms/recycle-crew-form"
import RetireFlightForm from "@/components/forms/retire-flight-form"

export default function ManageFlights() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Manage Flights</h2>
      <Tabs defaultValue="offer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="offer">Offer Flight</TabsTrigger>
          <TabsTrigger value="assign">Assign Pilot</TabsTrigger>
          <TabsTrigger value="board">Board Passengers</TabsTrigger>
          <TabsTrigger value="disembark">Disembark Passengers</TabsTrigger>
        </TabsList>
        <TabsList className="mt-2 grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="takeoff">Flight Takeoff</TabsTrigger>
          <TabsTrigger value="landing">Flight Landing</TabsTrigger>
          <TabsTrigger value="recycle">Recycle Crew</TabsTrigger>
          <TabsTrigger value="retire">Retire Flight</TabsTrigger>
        </TabsList>
        <TabsContent value="offer">
          <OfferFlightForm />
        </TabsContent>
        <TabsContent value="assign">
          <AssignPilotForm />
        </TabsContent>
        <TabsContent value="board">
          <BoardPassengersForm />
        </TabsContent>
        <TabsContent value="disembark">
          <DisembarkPassengersForm />
        </TabsContent>
        <TabsContent value="takeoff">
          <FlightTakeoffForm />
        </TabsContent>
        <TabsContent value="landing">
          <FlightLandingForm />
        </TabsContent>
        <TabsContent value="recycle">
          <RecycleCrewForm />
        </TabsContent>
        <TabsContent value="retire">
          <RetireFlightForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
