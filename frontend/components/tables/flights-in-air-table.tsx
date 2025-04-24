"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface FlightInAir {
  departing_from: string
  arriving_at: string
  num_flights: number
  flight_list: string
  earliest_arrival: string
  latest_arrival: string
  airplane_list: string
}

export default function FlightsInAirTable() {
  const [flights, setFlights] = useState<FlightInAir[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFlights = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getFlightsInAir()
      setFlights(response.data)
    } catch (error) {
      console.error("Error fetching flights in air:", error)
      setFlights([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFlights()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Flights in the Air</CardTitle>
        <Button variant="outline" size="icon" onClick={fetchFlights} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : flights.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No flights currently in the air</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Departing From</TableHead>
                  <TableHead>Arriving At</TableHead>
                  <TableHead>Number of Flights</TableHead>
                  <TableHead>Flight List</TableHead>
                  <TableHead>Earliest Arrival</TableHead>
                  <TableHead>Latest Arrival</TableHead>
                  <TableHead>Airplane List</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.map((flight, index) => (
                  <TableRow key={index}>
                    <TableCell>{flight.departing_from}</TableCell>
                    <TableCell>{flight.arriving_at}</TableCell>
                    <TableCell>{flight.num_flights}</TableCell>
                    <TableCell>{flight.flight_list}</TableCell>
                    <TableCell>{flight.earliest_arrival}</TableCell>
                    <TableCell>{flight.latest_arrival}</TableCell>
                    <TableCell>{flight.airplane_list}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
