"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface FlightOnGround {
  departing_from: string
  num_flights: number
  flight_list: string
  earliest_arrival: string
  latest_arrival: string
  airplane_list: string
}

export default function FlightsOnGroundTable() {
  const [flights, setFlights] = useState<FlightOnGround[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFlights = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getFlightsOnGround()
      setFlights(response.data)
    } catch (error) {
      console.error("Error fetching flights on ground:", error)
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
        <div>
          <CardTitle>Flights on the Ground</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={fetchFlights} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : flights.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No flights currently on the ground</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Departing From</TableHead>
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
