"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface AlternativeAirport {
  city: string
  state: string
  country: string
  num_airports: number
  airport_code_list: string
  airport_name_list: string
}

export default function AlternativeAirportsTable() {
  const [airports, setAirports] = useState<AlternativeAirport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAirports = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getAlternativeAirports()
      setAirports(response.data)
    } catch (error) {
      console.error("Error fetching alternative airports:", error)
      setAirports([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAirports()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Alternative Airports</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={fetchAirports} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : airports.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No alternative airports data available</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Number of Airports</TableHead>
                  <TableHead>Airport Codes</TableHead>
                  <TableHead>Airport Names</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {airports.map((airport, index) => (
                  <TableRow key={index}>
                    <TableCell>{airport.city}</TableCell>
                    <TableCell>{airport.state}</TableCell>
                    <TableCell>{airport.country}</TableCell>
                    <TableCell>{airport.num_airports}</TableCell>
                    <TableCell>{airport.airport_code_list}</TableCell>
                    <TableCell>{airport.airport_name_list}</TableCell>
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
