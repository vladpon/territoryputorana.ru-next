import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function AdminLayout({ children }) {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
        redirect("/login")
    }

    return (
        <html>
            <body>
                <div style={{ padding: "24px" }}>
                    <header
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                            marginBottom: "24px",
                            paddingBottom: "16px",
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <Link href="/admin">Админка</Link>
                        <Link href="/admin/tours">Туры</Link>
                    </header>

                    {children}
                </div>
            </body>
        </html>
    )
}