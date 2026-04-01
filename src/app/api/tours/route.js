
import { NextResponse } from "next/server"
import { getTours, getToursProperty } from "@/lib/mongo/tours"

export async function GET(request) {

    const property = request.nextUrl.searchParams.get('property')

    if(property)
    {
        try {
            const tours = await getToursProperty(property)
            return NextResponse.json(tours, { status: 200 })
        } catch (error) {
            console.error(error)
            return NextResponse.json(
                { error: "Failed to fetch tours" },
                { status: 500 }
            )
        }
    } else
    {
        try {
            const tours = await getTours()
            return NextResponse.json(tours, { status: 200 })
        } catch (error) {
            console.error(error)
            return NextResponse.json(
                { error: "Failed to fetch tours" },
                { status: 500 }
            )
        }
    }
}
