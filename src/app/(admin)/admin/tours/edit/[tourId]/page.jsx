import TourForm from "@/components/admin/TourForm"

export default async function EditTourPage({ params }) {
    const { tourId } = await params

    return (
        <main style={{ padding: "24px" }}>
            <h1 style={{ marginBottom: "20px" }}>Редактирование тура</h1>
            <TourForm tourId={tourId} />
        </main>
    )
}