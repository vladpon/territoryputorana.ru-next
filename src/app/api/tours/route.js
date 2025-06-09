import { getTours, getToursProperty } from "../../../lib/mongo/tours"
import { NextResponse } from "next/server"

export async function GET(request) {
    
    const property = request.nextUrl.searchParams.get('property')
    const result = property ? await getToursProperty(property) : await getTours()    


    return NextResponse.json(result)
}