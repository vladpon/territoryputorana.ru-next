import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";



// export async function GET(req, { params }) {


//   const tour = await db
//     .collection("tours")
//     .findOne({ _id: new ObjectId(params.id) });

//   return Response.json(tour);
// }




// export async function PUT(req, { params }) {

//   const body = await req.json();

//   const client = await clientPromise;
//   const db = client.db("territory");

//   await db.collection("tours").updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: body }
//   );

//   return Response.json({ success: true });
// }

// export async function DELETE(req, { params }) {

//   const client = await clientPromise;
//   const db = client.db("territory");

//   await db.collection("tours").deleteOne({
//     _id: new ObjectId(params.id)
//   });

//   return Response.json({ success: true });
// }