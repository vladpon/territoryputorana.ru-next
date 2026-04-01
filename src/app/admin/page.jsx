import Link from "next/link"

export default function AdminPage() {
    return (
        <main>
            <h1 style={{ marginBottom: "16px" }}>Админка</h1>

            <div style={{ display: "grid", gap: "12px", maxWidth: "420px" }}>
                <Link href="/admin/tours">Перейти к турам</Link>
            </div>
        </main>
    )
}