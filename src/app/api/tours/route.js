import { getTours } from "../../../lib/mongo/tours"
import { NextResponse } from "next/server"

export async function GET(request) {
    
    console.log(request.nextUrl.searchParams.get('var'))

    
    const tours = await getTours()



    return NextResponse.json(tours.tours)
}