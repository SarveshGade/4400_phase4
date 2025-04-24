"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface PersonInAir {
  departing_from: string
  arriving_at: string
  num_airplanes: number
  airplane_list: string
  flight_list: string
  earliest_arrival: string
  latest_arrival: string
  num_pilots: number
  num_passengers: number
  joint_pilots_passengers: number
  person_list: string
}

export default function PeopleInAirTable() {
  const [people, setPeople] = useState<PersonInAir[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPeople = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getPeopleInAir()
      setPeople(response.data)
    } catch (error) {
      console.error("Error fetching people in air:", error)
      setPeople([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>People in the Air</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={fetchPeople} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : people.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No people currently in the air</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Departing From</TableHead>
                  <TableHead>Arriving At</TableHead>
                  <TableHead>Number of Airplanes</TableHead>
                  <TableHead>Airplane List</TableHead>
                  <TableHead>Flight List</TableHead>
                  <TableHead>Earliest Arrival</TableHead>
                  <TableHead>Latest Arrival</TableHead>
                  <TableHead>Pilots</TableHead>
                  <TableHead>Passengers</TableHead>
                  <TableHead>Total People</TableHead>
                  <TableHead>Person List</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell>{person.departing_from}</TableCell>
                    <TableCell>{person.arriving_at}</TableCell>
                    <TableCell>{person.num_airplanes}</TableCell>
                    <TableCell>{person.airplane_list}</TableCell>
                    <TableCell>{person.flight_list}</TableCell>
                    <TableCell>{person.earliest_arrival}</TableCell>
                    <TableCell>{person.latest_arrival}</TableCell>
                    <TableCell>{person.num_pilots}</TableCell>
                    <TableCell>{person.num_passengers}</TableCell>
                    <TableCell>{person.joint_pilots_passengers}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={person.person_list}>
                      {person.person_list}
                    </TableCell>
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
