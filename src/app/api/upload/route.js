import { upload } from "@/lib/multer"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"

export const runtime = "nodejs"

export async function POST(req) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  return new Promise((resolve, reject) => {
    upload.single("file")(req, {}, function (err) {
      if (err) {
        reject(NextResponse.json({ error: err.message }, { status: 400 }))
        return
      }

      resolve(
        NextResponse.json({
          path: "/uploads/tours/" + req.file.filename,
        })
      )
    })
  })
}
