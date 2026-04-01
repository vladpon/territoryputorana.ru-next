"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TourForm({ initialData }) {
    const router = useRouter()

    const originalTourId = initialData.tourId

    const [jsonText, setJsonText] = useState(
        JSON.stringify(initialData, null, 2)
    )
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSave() {
        setError("")
        setSuccess("")

        let parsedData

        try {
            parsedData = JSON.parse(jsonText)
        } catch (err) {
            setError("Некорректный JSON")
            return
        }

        delete parsedData._id

        setSaving(true)

        try {
            const res = await fetch(`/api/tours/${originalTourId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(parsedData)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data?.error || "Ошибка сохранения")
                setSaving(false)
                return
            }

            setSuccess("Изменения сохранены")
            setSaving(false)

            if (parsedData.tourId && parsedData.tourId !== originalTourId) {
                router.push(`/admin/tours/edit/${parsedData.tourId}`)
                router.refresh()
                return
            }

            router.refresh()
        } catch (err) {
            setError("Ошибка сети при сохранении")
            setSaving(false)
        }
    }

    return (
        <div style={{ display: "grid", gap: "16px" }}>
            <div
                style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fafafa"
                }}
            >
                <div><strong>Редактирование целого документа</strong></div>
                <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                    Пока структура БД не реформирована, это самый удобный способ.
                </div>
            </div>

            <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
                style={{
                    width: "100%",
                    minHeight: "700px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px"
                }}
            />

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: "10px 16px",
                        cursor: saving ? "default" : "pointer"
                    }}
                >
                    {saving ? "Сохраняем..." : "Сохранить"}
                </button>

                {success ? (
                    <span style={{ color: "green" }}>{success}</span>
                ) : null}

                {error ? (
                    <span style={{ color: "crimson" }}>{error}</span>
                ) : null}
            </div>
        </div>
    )
}