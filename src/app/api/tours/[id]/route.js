import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {

  try {

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // 🔥 удаляем _id если пришёл
    delete body._id;

    // 🔥 базовая валидация
    if (!body.title) {
      return Response.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("territory");

    const result = await db.collection("tours").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      updated: result.modifiedCount
    });

  } catch (error) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }

}