// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export default function TourForm({ initialData }) {
//     const router = useRouter()

//     const originalTourId = initialData.tourId

//     const [jsonText, setJsonText] = useState(
//         JSON.stringify(initialData, null, 2)
//     )
//     const [saving, setSaving] = useState(false)
//     const [error, setError] = useState("")
//     const [success, setSuccess] = useState("")

//     async function handleSave() {
//         setError("")
//         setSuccess("")

//         let parsedData

//         try {
//             parsedData = JSON.parse(jsonText)
//         } catch (err) {
//             setError("Некорректный JSON")
//             return
//         }

//         delete parsedData._id

//         setSaving(true)

//         try {
//             const res = await fetch(`/api/tours/${originalTourId}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(parsedData)
//             })

//             const data = await res.json()

//             if (!res.ok) {
//                 setError(data?.error || "Ошибка сохранения")
//                 setSaving(false)
//                 return
//             }

//             setSuccess("Изменения сохранены")
//             setSaving(false)

//             if (parsedData.tourId && parsedData.tourId !== originalTourId) {
//                 router.push(`/admin/tours/edit/${parsedData.tourId}`)
//                 router.refresh()
//                 return
//             }

//             router.refresh()
//         } catch (err) {
//             setError("Ошибка сети при сохранении")
//             setSaving(false)
//         }
//     }

//     return (
//         <div style={{ display: "grid", gap: "16px" }}>
//             <div
//                 style={{
//                     padding: "12px",
//                     border: "1px solid #ddd",
//                     borderRadius: "8px",
//                     background: "#fafafa"
//                 }}
//             >
//                 <div><strong>Редактирование целого документа</strong></div>
//                 <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
//                     Пока структура БД не реформирована, это самый удобный способ.
//                 </div>
//             </div>

//             <textarea
//                 value={jsonText}
//                 onChange={(e) => setJsonText(e.target.value)}
//                 spellCheck={false}
//                 style={{
//                     width: "100%",
//                     minHeight: "700px",
//                     fontFamily: "monospace",
//                     fontSize: "14px",
//                     lineHeight: "1.5",
//                     padding: "16px",
//                     border: "1px solid #ccc",
//                     borderRadius: "8px"
//                 }}
//             />

//             <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
//                 <button
//                     type="button"
//                     onClick={handleSave}
//                     disabled={saving}
//                     style={{
//                         padding: "10px 16px",
//                         cursor: saving ? "default" : "pointer"
//                     }}
//                 >
//                     {saving ? "Сохраняем..." : "Сохранить"}
//                 </button>

//                 {success ? (
//                     <span style={{ color: "green" }}>{success}</span>
//                 ) : null}

//                 {error ? (
//                     <span style={{ color: "crimson" }}>{error}</span>
//                 ) : null}
//             </div>
//         </div>
//     )
// }


"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

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
        return <div>Загрузка тура...</div>
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "grid",
                gap: "24px",
                maxWidth: "1000px"
            }}
        >
            <section
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "grid",
                    gap: "16px"
                }}
            >
                <h2 style={{ margin: 0 }}>Основная информация</h2>

                <div style={{ display: "grid", gap: "12px" }}>
                    <label>
                        <div>Название тура</div>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>tourId</div>
                        <input
                            name="tourId"
                            value={form.tourId}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>href</div>
                        <input
                            name="href"
                            value={form.href}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    {previewHref ? (
                        <div style={{ fontSize: "14px", color: "#666" }}>
                            Предпросмотр ссылки: {previewHref}
                        </div>
                    ) : null}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gap: "12px"
                        }}
                    >
                        <label>
                            <div>Сезон</div>
                            <input
                                name="season"
                                value={form.season}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </label>

                        <label>
                            <div>Длительность</div>
                            <input
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </label>

                        <label>
                            <div>Цена</div>
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </label>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: "12px"
                        }}
                    >
                        <label>
                            <div>Reference</div>
                            <input
                                name="reference"
                                value={form.reference}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </label>

                        <label>
                            <div>Порядок на главной</div>
                            <input
                                name="mainPageOrder"
                                value={form.mainPageOrder}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px" }}
                            />
                        </label>
                    </div>
                </div>
            </section>

            <section
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "grid",
                    gap: "16px"
                }}
            >
                <h2 style={{ margin: 0 }}>Заголовки и короткие блоки</h2>

                <div style={{ display: "grid", gap: "12px" }}>
                    <label>
                        <div>aboutTitle</div>
                        <input
                            name="aboutTitle"
                            value={form.aboutTitle}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>detailsTitle</div>
                        <input
                            name="detailsTitle"
                            value={form.detailsTitle}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>details</div>
                        <textarea
                            name="details"
                            value={form.details}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>included</div>
                        <textarea
                            name="included"
                            value={form.included}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    <label>
                        <div>clothes</div>
                        <textarea
                            name="clothes"
                            value={form.clothes}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>
                </div>
            </section>

            <section
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "grid",
                    gap: "16px"
                }}
            >
                <h2 style={{ margin: 0 }}>Изображения обложки</h2>

                <div style={{ display: "grid", gap: "12px" }}>
                    <label>
                        <div>bigImg</div>
                        <input
                            name="bigImg"
                            value={form.bigImg}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    {form.bigImg ? (
                        <img
                            src={form.bigImg}
                            alt=""
                            style={{
                                maxWidth: "320px",
                                borderRadius: "8px",
                                border: "1px solid #ddd"
                            }}
                        />
                    ) : null}

                    <label>
                        <div>smallImg</div>
                        <input
                            name="smallImg"
                            value={form.smallImg}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </label>

                    {form.smallImg ? (
                        <img
                            src={form.smallImg}
                            alt=""
                            style={{
                                maxWidth: "240px",
                                borderRadius: "8px",
                                border: "1px solid #ddd"
                            }}
                        />
                    ) : null}
                </div>
            </section>

            <section
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "grid",
                    gap: "16px"
                }}
            >
                <h2 style={{ margin: 0 }}>Массивы строк</h2>

                <label>
                    <div>about — по одной строке на пункт</div>
                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        rows={8}
                        style={{ width: "100%", padding: "10px" }}
                    />
                </label>

                <label>
                    <div>description — по одной строке на пункт</div>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={8}
                        style={{ width: "100%", padding: "10px" }}
                    />
                </label>
            </section>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        padding: "12px 18px",
                        cursor: saving ? "default" : "pointer"
                    }}
                >
                    {saving ? "Сохраняем..." : "Сохранить изменения"}
                </button>

                {success ? (
                    <span style={{ color: "green" }}>{success}</span>
                ) : null}

                {error ? (
                    <span style={{ color: "crimson" }}>{error}</span>
                ) : null}
            </div>
        </form>
    )
}