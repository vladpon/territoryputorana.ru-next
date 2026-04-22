import { NextResponse } from "next/server";
import { getTourPage, updateTourPage } from "@/lib/mongo/tourPages";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(request, { params }) {
  try {
    const { tourId } = await params;

    const page = await getTourPage(tourId);

    if (!page) {
      return NextResponse.json(
        { error: "Tour page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch tour page" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();

    const { tourId } = await params;
    const body = await request.json();

    const updatedPage = await updateTourPage(tourId, body);

    if (!updatedPage) {
      return NextResponse.json(
        { error: "Tour page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error(error);

    const message =
      error?.message === "Unauthorized"
        ? "Unauthorized"
        : "Failed to update tour page";

    const status = error?.message === "Unauthorized" ? 401 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}