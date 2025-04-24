"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { airlineApi } from "@/lib/api"

interface PersonOnGround {
  departing_from: string
  airport: string
  airport_name: string
  city: string
  state: string
  country: string
  num_pilots: number
  num_passengers: number
  joint_pilots_passengers: number
  person_list: string
}

export default function PeopleOnGroundTable() {
  const [people, setPeople] = useState<PersonOnGround[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPeople = async () => {
    setIsLoading(true)
    try {
      const response = await airlineApi.getPeopleOnGround()
      setPeople(response.data)
    } catch (error) {
      console.error("Error fetching people on ground:", error)
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
          <CardTitle>People on the Ground</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={fetchPeople} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : people.length === 0 ? (
          <div className="flex justify-center py-8 text-muted-foreground">No people currently on the ground</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Airport ID</TableHead>
                  <TableHead>Location ID</TableHead>
                  <TableHead>Airport Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Country</TableHead>
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
                    <TableCell>{person.airport}</TableCell>
                    <TableCell>{person.airport_name}</TableCell>
                    <TableCell>{person.city}</TableCell>
                    <TableCell>{person.state}</TableCell>
                    <TableCell>{person.country}</TableCell>
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
