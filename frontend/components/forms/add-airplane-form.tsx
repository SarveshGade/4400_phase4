"use client"

import { useState, useMemo, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { airlineApi } from "@/lib/api"

// Schemas
const boeingSchema = z.object({
  airlineID: z.string().min(1),
  tail_num: z.string().min(1),
  seat_capacity: z.coerce.number().int().positive(),
  speed: z.coerce.number().int().positive(),
  locationID: z.string().min(1),
  plane_type: z.literal("Boeing"),
  maintenanced: z.boolean(),
  model: z.string().min(1),
})

const airbusSchema = z.object({
  airlineID: z.string().min(1),
  tail_num: z.string().min(1),
  seat_capacity: z.coerce.number().int().positive(),
  speed: z.coerce.number().int().positive(),
  locationID: z.string().min(1),
  plane_type: z.literal("Airbus"),
  neo: z.boolean(),
})

export default function AddAirplaneForm() {
  const [planeType, setPlaneType] = useState<"Boeing" | "Airbus">("Boeing")

  const schema = useMemo(() => {
    return planeType === "Boeing" ? boeingSchema : airbusSchema
  }, [planeType])

  const form = useForm({
    resolver: zodResolver(schema),
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

  useEffect(() => {
    form.setValue("plane_type", planeType)
  }, [planeType])

  const onSubmit = async (values: any) => {
    console.log("Submitting values:", values)
    try {
      await airlineApi.addAirplane(values)
      form.reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Airplane</h2>
      <div className="flex gap-2 mb-4">
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
                <FormControl><Input {...field} /></FormControl>
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
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seat_capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seat Capacity</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
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
                <FormControl><Input type="number" {...field} /></FormControl>
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
                <FormControl><Input {...field} /></FormControl>
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
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Maintenance Status</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
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
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>NEO Version</FormLabel>
                </FormItem>
              )}
            />
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
