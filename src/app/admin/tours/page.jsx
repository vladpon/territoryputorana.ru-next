import Link from "next/link"
import { getTours } from "@/lib/mongo/tours"

export default async function AdminToursPage() {
    const tours = await getTours()

    return (
        <main>
            <h1 style={{ marginBottom: "20px" }}>Туры</h1>

            <div style={{ display: "grid", gap: "12px" }}>
                {tours.map((tour) => (
                    <div
                        key={tour.tourId}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px"
                        }}
                    >
                        <div style={{ marginBottom: "8px" }}>
                            <strong>{tour.title || "Без названия"}</strong>
                        </div>

                        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
                            tourId: {tour.tourId}
                        </div>

                        <Link href={`/admin/tours/edit/${tour.tourId}`}>
                            Редактировать
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}