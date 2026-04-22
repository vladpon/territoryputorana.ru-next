import { NextResponse } from "next/server";
import { getTourPages } from "@/lib/mongo/tourPages";

export async function GET() {
  try {
    const pages = await getTourPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch tour pages" },
      { status: 500 }
    );
  }
}