import { NextResponse } from "next/server"
import { getTour, updateTour } from "@/lib/mongo/tours"
import { requireAdmin } from "@/lib/require-admin"
// import { auth } from "@/auth"

export async function GET(request, { params }) {
    try {
        const { tourId } = await params
        const tour = await getTour(tourId)

        if (!tour) {
            return NextResponse.json(
                { error: "Tour not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(tour, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch tour" },
            { status: 500 }
        )
    }
}

export async function PATCH(request, { params }) {

    const guard = await requireAdmin()
    if (!guard.ok) return guard.response

    try {
        const { tourId } = await params
        const body = await request.json()

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { error: "Empty update data" },
                { status: 400 }
            )
        }

        const result = await updateTour(tourId, body)

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Tour not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Tour updated successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to update tour" },
            { status: 500 }
        )
    }
}

