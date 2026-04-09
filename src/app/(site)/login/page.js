"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false
        })

        setLoading(false)

        if (result?.error) {
            setError("Неверный логин или пароль")
            return
        }

        router.push("/admin")
        router.refresh()
    }

    return (
        <main style={{ maxWidth: 420, margin: "60px auto", padding: 20 }}>
            <h1 style={{ marginBottom: 20 }}>Login</h1>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                </button>

                {error ? (
                    <p style={{ color: "crimson", margin: 0 }}>{error}</p>
                ) : null}
            </form>
        </main>
    )
}