import { notFound } from "next/navigation"
import { getTour } from "@/lib/mongo/tours"
import TourForm from "@/components/admin/TourForm"

export default async function EditTourPage({ params }) {
    const { tourId } = await params
    const tour = await getTour(tourId)

    if (!tour) {
        notFound()
    }

    const safeTour = {
        ...tour,
        _id: tour._id?.toString?.() || tour._id
    }

    return (
        <main>
            <h1 style={{ marginBottom: "8px" }}>Редактирование тура</h1>
            <p style={{ marginBottom: "20px", color: "#666" }}>
                {safeTour.title} / {safeTour.tourId}
            </p>

            <TourForm initialData={safeTour} />
        </main>
    )
}