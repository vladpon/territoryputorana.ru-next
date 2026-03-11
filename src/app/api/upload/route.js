import { upload } from "@/lib/multer";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false
  }
};

export async function POST(req) {

  return new Promise((resolve, reject) => {

    upload.single("file")(req, {}, function (err) {

      if (err) {
        reject(NextResponse.json({ error: err.message }));
        return;
      }

      resolve(
        NextResponse.json({
          path: "/uploads/tours/" + req.file.filename
        })
      );

    });

  });

}