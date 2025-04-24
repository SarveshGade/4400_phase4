"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { airlineApi } from "@/lib/api"

const formSchema = z.object({
  flightID: z.string().min(1),
})

export default function FlightLandingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightID: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await airlineApi.flightLanding(values)
      form.reset()
    } catch (error) {
      console.error("Error landing flight:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Land Flight</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="flightID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Land Flight</Button>
        </form>
      </Form>
    </div>
  )
}
