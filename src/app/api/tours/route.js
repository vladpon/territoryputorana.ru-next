import { getTours } from "../../../lib/mongo/tours"

export async function GET(request) {
    const tours = await getTours()
    return new Response(JSON.stringify(tours.tours))
}