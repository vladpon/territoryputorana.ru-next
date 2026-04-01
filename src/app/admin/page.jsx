import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
        redirect("/login")
    }

    return (
        <main>
            <h1>Админка</h1>
            <p>Вы авторизованы</p>
        </main>
    )
}