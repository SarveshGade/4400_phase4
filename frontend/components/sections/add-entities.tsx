"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddAirportForm from "@/components/forms/add-airport-form"
import AddPersonForm from "@/components/forms/add-person-form"
import AddAirplaneForm from "@/components/forms/add-airplane-form"
import GrantRevokeLicenseForm from "@/components/forms/grant-revoke-license-form"

export default function AddEntities() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Add Entities</h2>
      <Tabs defaultValue="airport" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="airport">Airport</TabsTrigger>
          <TabsTrigger value="person">Person</TabsTrigger>
          <TabsTrigger value="airplane">Airplane</TabsTrigger>
          <TabsTrigger value="license">Pilot License</TabsTrigger>
        </TabsList>
        <TabsContent value="airport">
          <AddAirportForm />
        </TabsContent>
        <TabsContent value="person">
          <AddPersonForm />
        </TabsContent>
        <TabsContent value="airplane">
          <AddAirplaneForm />
        </TabsContent>
        <TabsContent value="license">
          <GrantRevokeLicenseForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
