"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "./AdminToursPage.module.scss"

export default function AdminToursPage() {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadTours() {
            try {
                setLoading(true)
                setError("")

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

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.stateBox}>Загрузка туров...</div>
            </main>
        )
    }

    if (error) {
        return (
            <main className={styles.page}>
                <div className={`${styles.stateBox} ${styles.errorBox}`}>
                    {error}
                </div>
            </main>
        )
    }

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Туры</h1>
                    <p className={styles.subtitle}>
                        Список туров для редактирования в админке.
                    </p>
                </div>

                <div className={styles.counter}>
                    Всего туров: <span>{tours.length}</span>
                </div>
            </div>

            {tours.length === 0 ? (
                <div className={styles.stateBox}>Туры не найдены</div>
            ) : (
                <div className={styles.grid}>
                    {tours.map((tour) => (
                        <article key={tour.tourId} className={styles.card}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardContent}>
                                    <h2 className={styles.cardTitle}>
                                        {tour.title || "Без названия"}
                                    </h2>

                                    <div className={styles.meta}>
                                        <span className={styles.badge}>
                                            tourId: {tour.tourId || "—"}
                                        </span>

                                        {tour.season ? (
                                            <span className={styles.badge}>
                                                {tour.season}
                                            </span>
                                        ) : null}

                                        {tour.time ? (
                                            <span className={styles.badge}>
                                                {tour.time}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className={styles.infoList}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Цена</span>
                                            <span className={styles.infoValue}>
                                                {tour.price || "—"}
                                            </span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Ссылка</span>
                                            <span className={styles.infoValue}>
                                                {tour.href || "—"}
                                            </span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Порядок</span>
                                            <span className={styles.infoValue}>
                                                {tour.mainPageOrder ?? "—"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {tour.smallImg ? (
                                    <div className={styles.imageWrap}>
                                        <img
                                            className={styles.image}
                                            src={tour.smallImg}
                                            alt={tour.title || ""}
                                        />
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.actions}>
                                <Link
                                    className={styles.editLink}
                                    href={`/admin/tours/edit/${tour.tourId}`}
                                >
                                    Редактировать
                                </Link>

                                {tour.href ? (
                                    <Link
                                        className={styles.viewLink}
                                        href={tour.href}
                                        target="_blank"
                                    >
                                        Открыть страницу
                                    </Link>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}