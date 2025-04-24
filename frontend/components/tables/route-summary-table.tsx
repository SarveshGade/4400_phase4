"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface RouteSummary {
  route: string
  num_legs: number
  leg_sequence: string
  route_length: number
  num_flights: number
  flight_list: string
  airport_sequence: string
}

export default function RouteSummaryTable() {
  const [routes, setRoutes] = useState<RouteSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRoutes = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getRouteSummary()
      setRoutes(response.data)
    } catch (error) {
      console.error("Error fetching route summary:", error)
      setRoutes([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRoutes()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Route Summary</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={fetchRoutes} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : routes.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No route data available</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route ID</TableHead>
                  <TableHead>Number of Legs</TableHead>
                  <TableHead>Leg Sequence</TableHead>
                  <TableHead>Route Length</TableHead>
                  <TableHead>Number of Flights</TableHead>
                  <TableHead>Flight List</TableHead>
                  <TableHead>Airport Sequence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route, index) => (
                  <TableRow key={index}>
                    <TableCell>{route.route}</TableCell>
                    <TableCell>{route.num_legs}</TableCell>
                    <TableCell>{route.leg_sequence}</TableCell>
                    <TableCell>{route.route_length} miles</TableCell>
                    <TableCell>{route.num_flights}</TableCell>
                    <TableCell>{route.flight_list}</TableCell>
                    <TableCell>{route.airport_sequence}</TableCell>
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
