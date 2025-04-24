"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { airlineApi } from "@/lib/api"

// Create separate schemas for Boeing and Airbus
const boeingSchema = z.object({
  airlineID: z.string().min(1, { message: "Airline ID is required." }),
  tail_num: z.string().min(1, { message: "Tail number is required." }),
  seat_capacity: z.coerce.number().int().positive({ message: "Seat capacity must be a positive number." }),
  speed: z.coerce.number().int().positive({ message: "Speed must be a positive number." }),
  locationID: z.string().min(1, { message: "Location ID is required." }),
  plane_type: z.literal("Boeing"),
  maintenanced: z.boolean(),
  model: z.string().min(1, { message: "Model is required for Boeing." }),
})

const airbusSchema = z.object({
  airlineID: z.string().min(1, { message: "Airline ID is required." }),
  tail_num: z.string().min(1, { message: "Tail number is required." }),
  seat_capacity: z.coerce.number().int().positive({ message: "Seat capacity must be a positive number." }),
  speed: z.coerce.number().int().positive({ message: "Speed must be a positive number." }),
  locationID: z.string().min(1, { message: "Location ID is required." }),
  plane_type: z.literal("Airbus"),
  neo: z.boolean(),
})

type FormValues = {
  airlineID: string
  tail_num: string
  seat_capacity: number
  speed: number
  locationID: string
  plane_type: "Boeing" | "Airbus"
  maintenanced?: boolean
  model?: string
  neo?: boolean
}

export default function AddAirplaneForm() {
  const [planeType, setPlaneType] = useState<"Boeing" | "Airbus">("Boeing")

  const form = useForm<FormValues>({
    resolver: zodResolver(planeType === "Boeing" ? boeingSchema : airbusSchema),
    defaultValues: {
      airlineID: "",
      tail_num: "",
      seat_capacity: 0,
      speed: 0,
      locationID: "",
      plane_type: planeType,
      maintenanced: false,
      model: "",
      neo: false,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      const planeData = {
        airlineID: values.airlineID,
        tail_num: values.tail_num,
        seat_capacity: Number(values.seat_capacity),
        speed: Number(values.speed),
        locationID: values.locationID,
        plane_type: values.plane_type,
        maintenanced: values.plane_type === "Boeing" ? values.maintenanced : null,
        model: values.plane_type === "Boeing" ? values.model : null,
        neo: values.plane_type === "Airbus" ? values.neo : null,
      }

      await airlineApi.addAirplane(planeData)
      form.reset()
    } catch (error) {
      console.error("Error adding airplane:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Airplane</h2>
      <div className="flex space-x-4 mb-4">
        <Button
          type="button"
          variant={planeType === "Boeing" ? "default" : "outline"}
          onClick={() => setPlaneType("Boeing")}
        >
          Boeing
        </Button>
        <Button
          type="button"
          variant={planeType === "Airbus" ? "default" : "outline"}
          onClick={() => setPlaneType("Airbus")}
        >
          Airbus
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="airlineID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airline ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tail_num"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tail Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="seat_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seat Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speed</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          {planeType === "Boeing" ? (
            <>
              <FormField
                control={form.control}
                name="maintenanced"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Maintenance Status</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="neo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>NEO Version</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Add Airplane</Button>
        </form>
      </Form>
    </div>
  )
}
