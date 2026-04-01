import { NextResponse } from "next/server"
import { getMainPageTours } from "@/lib/mongo/tours"

export async function GET() {
    try {
        const tours = await getMainPageTours()

        return NextResponse.json(tours, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch main page tours" },
            { status: 500 }
        )
    }
}