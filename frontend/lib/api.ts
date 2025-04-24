import axios from "axios"

// Create an axios instance with the base URL and default headers
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change this if your Flask server runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || "An unexpected error occurred"
    console.error("API Error:", message)
    return Promise.reject(error)
  },
)

// API functions that match the Flask endpoints
export const airlineApi = {
  // Views
  getFlightsInAir: () => api.get("/flights-in-air"),
  getFlightsOnGround: () => api.get("/flights-on-ground"),
  getPeopleInAir: () => api.get("/people-in-air"),
  getPeopleOnGround: () => api.get("/people-on-ground"),
  getRouteSummary: () => api.get("/route-summary"),
  getAlternativeAirports: () => api.get("/alternative-airports"),

  // Add Entities
  addAirport: (data: any) => api.post("/add_airport", data),
  addPerson: (data: any) => api.post("/add_person", data),
  addAirplane: (data: any) => api.post("/add_airplane", data),
  grantRevokeLicense: (data: any) => api.post("/grant-or-revoke-pilot-license", data),

  // Manage Flights
  offerFlight: (data: any) => api.post("/offer-flight", data),
  assignPilot: (data: { flightID: string; personID: string }) => api.post("/assign-pilot", data),
  boardPassengers: (data: any) => api.post("/passengers-board", data),
  disembarkPassengers: (data: any) => api.post("/passengers-disembark", data),
  flightTakeoff: (data: { flightID: string }) => api.post("/flight-takeoff", data),
  flightLanding: (data: { flightID: string }) => api.post("/flight-landing", data),
  recycleCrew: (data: { flightID: string }) => api.post("/recycle-crew", data),
  retireFlight: (data: any) => api.post("/retire-flight", data),
  simulationCycle: () => api.post("/simulation-cycle"),
}

export const mockApi = {
  offerFlight: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  assignPilot: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  boardPassengers: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  disembarkPassengers: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  flightTakeoff: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  flightLanding: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  recycleCrew: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
  retireFlight: (data: any) => new Promise((resolve) => setTimeout(resolve, 500)),
}
