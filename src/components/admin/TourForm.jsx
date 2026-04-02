"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./TourForm.module.scss"

function linesToArray(value) {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
}

function arrayToLines(value) {
    return Array.isArray(value) ? value.join("\n") : ""
}

const initialFormState = {
    title: "",
    tourId: "",
    href: "",
    season: "",
    time: "",
    price: "",
    reference: "",
    mainPageOrder: "",
    aboutTitle: "",
    detailsTitle: "",
    details: "",
    included: "",
    clothes: "",
    bigImg: "",
    smallImg: "",
    about: "",
    description: ""
}

export default function TourForm({ tourId }) {
    const router = useRouter()

    const [form, setForm] = useState(initialFormState)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        async function loadTour() {
            try {
                setLoading(true)
                setError("")

                const res = await fetch(`/api/tours/${tourId}`, {
                    cache: "no-store"
                })

                const data = await res.json()

                if (!res.ok) {
                    setError(data?.error || "Не удалось загрузить тур")
                    setLoading(false)
                    return
                }

                setForm({
                    title: data.title || "",
                    tourId: data.tourId || "",
                    href: data.href || "",
                    season: data.season || "",
                    time: data.time || "",
                    price: data.price || "",
                    reference: data.reference || "",
                    mainPageOrder:
                        data.mainPageOrder === 0 || data.mainPageOrder
                            ? String(data.mainPageOrder)
                            : "",
                    aboutTitle: data.aboutTitle || "",
                    detailsTitle: data.detailsTitle || "",
                    details: data.details || "",
                    included: data.included || "",
                    clothes: data.clothes || "",
                    bigImg: data.bigImg || "",
                    smallImg: data.smallImg || "",
                    about: arrayToLines(data.about),
                    description: arrayToLines(data.description)
                })

                setLoading(false)
            } catch (err) {
                setError("Ошибка загрузки тура")
                setLoading(false)
            }
        }

        loadTour()
    }, [tourId])

    function handleChange(e) {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const previewHref = useMemo(() => {
        if (!form.href) return ""
        return form.href.startsWith("/") ? form.href : `/${form.href}`
    }, [form.href])

    async function handleSubmit(e) {
        e.preventDefault()

        setSaving(true)
        setError("")
        setSuccess("")

        const payload = {
            title: form.title.trim(),
            tourId: form.tourId.trim(),
            href: form.href.trim(),
            season: form.season.trim(),
            time: form.time.trim(),
            price: form.price.trim(),
            reference: form.reference.trim(),
            aboutTitle: form.aboutTitle.trim(),
            detailsTitle: form.detailsTitle.trim(),
            details: form.details,
            included: form.included,
            clothes: form.clothes,
            bigImg: form.bigImg.trim(),
            smallImg: form.smallImg.trim(),
            about: linesToArray(form.about),
            description: linesToArray(form.description)
        }

        if (form.mainPageOrder.trim() !== "") {
            payload.mainPageOrder = Number(form.mainPageOrder)
        }

        try {
            const res = await fetch(`/api/tours/${tourId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data?.error || "Не удалось сохранить изменения")
                setSaving(false)
                return
            }

            setSuccess("Изменения сохранены")
            setSaving(false)

            if (form.tourId.trim() && form.tourId.trim() !== tourId) {
                router.push(`/admin/tours/edit/${form.tourId.trim()}`)
                return
            }

            router.refresh()
        } catch (err) {
            setError("Ошибка сети при сохранении")
            setSaving(false)
        }
    }

    if (loading) {
        return <div className={styles.stateBox}>Загрузка тура...</div>
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Основная информация</h2>
                    <p className={styles.sectionText}>
                        Базовые поля тура, URL и порядок вывода.
                    </p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.field}>
                        <span className={styles.label}>Название тура</span>
                        <input
                            className={styles.input}
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>tourId</span>
                        <input
                            className={styles.input}
                            name="tourId"
                            value={form.tourId}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>href</span>
                        <input
                            className={styles.input}
                            name="href"
                            value={form.href}
                            onChange={handleChange}
                        />
                    </label>

                    {previewHref ? (
                        <div className={styles.helper}>
                            Предпросмотр ссылки: <span>{previewHref}</span>
                        </div>
                    ) : null}

                    <div className={styles.grid3}>
                        <label className={styles.field}>
                            <span className={styles.label}>Сезон</span>
                            <input
                                className={styles.input}
                                name="season"
                                value={form.season}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Длительность</span>
                            <input
                                className={styles.input}
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Цена</span>
                            <input
                                className={styles.input}
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={styles.grid2}>
                        <label className={styles.field}>
                            <span className={styles.label}>Reference</span>
                            <input
                                className={styles.input}
                                name="reference"
                                value={form.reference}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Порядок на главной</span>
                            <input
                                className={styles.input}
                                name="mainPageOrder"
                                value={form.mainPageOrder}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Заголовки и текстовые блоки</h2>
                    <p className={styles.sectionText}>
                        Короткие текстовые поля и описания.
                    </p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.field}>
                        <span className={styles.label}>aboutTitle</span>
                        <input
                            className={styles.input}
                            name="aboutTitle"
                            value={form.aboutTitle}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>detailsTitle</span>
                        <input
                            className={styles.input}
                            name="detailsTitle"
                            value={form.detailsTitle}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>details</span>
                        <textarea
                            className={`${styles.input} ${styles.textarea}`}
                            name="details"
                            value={form.details}
                            onChange={handleChange}
                            rows={4}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>included</span>
                        <textarea
                            className={`${styles.input} ${styles.textarea}`}
                            name="included"
                            value={form.included}
                            onChange={handleChange}
                            rows={4}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>clothes</span>
                        <textarea
                            className={`${styles.input} ${styles.textarea}`}
                            name="clothes"
                            value={form.clothes}
                            onChange={handleChange}
                            rows={4}
                        />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Обложки</h2>
                    <p className={styles.sectionText}>
                        Основные изображения для карточки и страницы тура.
                    </p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.field}>
                        <span className={styles.label}>bigImg</span>
                        <input
                            className={styles.input}
                            name="bigImg"
                            value={form.bigImg}
                            onChange={handleChange}
                        />
                    </label>

                    {form.bigImg ? (
                        <div className={styles.previewWrap}>
                            <img className={styles.previewImage} src={form.bigImg} alt="" />
                        </div>
                    ) : null}

                    <label className={styles.field}>
                        <span className={styles.label}>smallImg</span>
                        <input
                            className={styles.input}
                            name="smallImg"
                            value={form.smallImg}
                            onChange={handleChange}
                        />
                    </label>

                    {form.smallImg ? (
                        <div className={styles.previewWrap}>
                            <img className={styles.previewImageSmall} src={form.smallImg} alt="" />
                        </div>
                    ) : null}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Массивы строк</h2>
                    <p className={styles.sectionText}>
                        Каждый пункт с новой строки. При сохранении строки превращаются в массив.
                    </p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.field}>
                        <span className={styles.label}>about</span>
                        <textarea
                            className={`${styles.input} ${styles.textareaLarge}`}
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            rows={8}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>description</span>
                        <textarea
                            className={`${styles.input} ${styles.textareaLarge}`}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={8}
                        />
                    </label>
                </div>
            </section>

            <div className={styles.actions}>
                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Сохраняем..." : "Сохранить изменения"}
                </button>

                {success ? (
                    <span className={`${styles.status} ${styles.success}`}>
                        {success}
                    </span>
                ) : null}

                {error ? (
                    <span className={`${styles.status} ${styles.error}`}>
                        {error}
                    </span>
                ) : null}
            </div>
        </form>
    )
}