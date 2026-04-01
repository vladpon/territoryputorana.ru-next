import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function requireAdmin() {
  const session = await auth()

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    }
  }

  if (session.user?.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    }
  }

  return { ok: true, session }
}