// import Link from "next/link"
// import { getTours } from "@/lib/mongo/tours"

// export default async function AdminToursPage() {
//     const tours = await getTours()

//     return (
//         <main>
//             <h1 style={{ marginBottom: "20px" }}>Туры</h1>

//             <div style={{ display: "grid", gap: "12px" }}>
//                 {tours.map((tour) => (
//                     <div
//                         key={tour.tourId}
//                         style={{
//                             border: "1px solid #ddd",
//                             borderRadius: "8px",
//                             padding: "16px"
//                         }}
//                     >
//                         <div style={{ marginBottom: "8px" }}>
//                             <strong>{tour.title || "Без названия"}</strong>
//                         </div>

//                         <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
//                             tourId: {tour.tourId}
//                         </div>

//                         <Link href={`/admin/tours/edit/${tour.tourId}`}>
//                             Редактировать
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </main>
//     )
// }


"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminToursPage() {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadTours() {
            try {
                const res = await fetch("/api/tours", {
                    cache: "no-store"
                })

                const data = await res.json()

                if (!res.ok) {
                    setError(data?.error || "Не удалось загрузить туры")
                    setLoading(false)
                    return
                }

                setTours(data)
                setLoading(false)
            } catch (err) {
                setError("Ошибка загрузки туров")
                setLoading(false)
            }
        }

        loadTours()
    }, [])

    if (loading) return <div style={{ padding: "24px" }}>Загрузка...</div>
    if (error) return <div style={{ padding: "24px", color: "crimson" }}>{error}</div>

    return (
        <main style={{ padding: "24px" }}>
            <h1 style={{ marginBottom: "20px" }}>Туры</h1>

            <div style={{ display: "grid", gap: "12px" }}>
                {tours.map((tour) => (
                    <div
                        key={tour.tourId}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "16px"
                        }}
                    >
                        <div style={{ fontWeight: 700 }}>{tour.title}</div>
                        <div style={{ color: "#666", marginTop: "6px" }}>
                            tourId: {tour.tourId}
                        </div>

                        <div style={{ marginTop: "12px" }}>
                            <Link href={`/admin/tours/edit/${tour.tourId}`}>
                                Редактировать
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}