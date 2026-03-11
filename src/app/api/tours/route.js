import { getTours, getToursProperty, insertTour } from "../../../lib/mongo/tours"
import { NextResponse } from "next/server"

export async function GET(request) {
    
    const property = request.nextUrl.searchParams.get('property')
    const result = property ? await getToursProperty(property) : await getTours()


    return NextResponse.json(result)
}

export async function POST(request) {

    const body = await request.json();
    const result = await insertTour(body)

    return NextResponse.json(result);

}