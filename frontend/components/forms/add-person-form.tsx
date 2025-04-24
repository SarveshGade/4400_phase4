"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { airlineApi } from "@/lib/api"

const pilotSchema = z.object({
  personID: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  locationID: z.string().min(1),
  taxID: z.string().min(1),
  experience: z.coerce.number().int().nonnegative(),
})

const passengerSchema = z.object({
  personID: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  locationID: z.string().min(1),
  miles: z.coerce.number().int().nonnegative(),
  funds: z.coerce.number().int().nonnegative(),
})

type FormValues = {
  personID: string
  first_name: string
  last_name: string
  locationID: string
  taxID: string
  experience: number
  miles: number
  funds: number
}

export default function AddPersonForm() {
  const [personType, setPersonType] = useState<"pilot" | "passenger">("pilot")

  const form = useForm<FormValues>({
    resolver: zodResolver(personType === "pilot" ? pilotSchema : passengerSchema),
    defaultValues: {
      personID: "",
      first_name: "",
      last_name: "",
      locationID: "",
      taxID: "",
      experience: 0,
      miles: 0,
      funds: 0,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await airlineApi.addPerson(values)
      form.reset()
    } catch (error) {
      console.error("Error adding person:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Person</h2>
      <div className="flex space-x-4 mb-4">
        <Button
          type="button"
          variant={personType === "pilot" ? "default" : "outline"}
          onClick={() => setPersonType("pilot")}
        >
          Pilot
        </Button>
        <Button
          type="button"
          variant={personType === "passenger" ? "default" : "outline"}
          onClick={() => setPersonType("passenger")}
        >
          Passenger
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="personID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Person ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {personType === "pilot" ? (
            <>
              <FormField
                control={form.control}
                name="taxID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="miles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miles</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="funds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funds</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit">Add Person</Button>
        </form>
      </Form>
    </div>
  )
}
