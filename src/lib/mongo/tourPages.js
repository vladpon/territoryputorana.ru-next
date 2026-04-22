import clientPromise from ".";
import { normalizeTourPage } from "@/lib/normalizers";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("tourPages");
}

export async function getTourPages() {
  try {
    const collection = await getCollection();
    const docs = await collection.find({}).sort({ updatedAt: -1 }).toArray();

    return docs.map(normalizeTourPage);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tour pages");
  }
}

export async function getPublishedTourPages() {
  try {
    const collection = await getCollection();
    const docs = await collection
      .find({ status: "published" })
      .sort({ updatedAt: -1 })
      .toArray();

    return docs.map(normalizeTourPage);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch published tour pages");
  }
}

export async function getTourPage(tourId) {
  try {
    const collection = await getCollection();
    const doc = await collection.findOne({ tourId });

    return doc ? normalizeTourPage(doc) : null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tour page");
  }
}

export async function getTourPageByPath(path) {
  try {
    const collection = await getCollection();
    const doc = await collection.findOne({ path });

    return doc ? normalizeTourPage(doc) : null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tour page by path");
  }
}

export async function getPublishedTourPageByPath(path) {
  try {
    const collection = await getCollection();
    const doc = await collection.findOne({
      path,
      status: "published"
    });

    return doc ? normalizeTourPage(doc) : null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch published tour page by path");
  }
}

export async function getMainPageTourPages() {
  try {
    const collection = await getCollection();
    const docs = await collection
      .find({
        "homePage.show": true,
        "homePage.order": { $gt: 0 },
        status: "published"
      })
      .sort({ "homePage.order": 1 })
      .toArray();

    return docs.map(normalizeTourPage);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch main page tour pages");
  }
}

export async function createTourPage(doc) {
  try {
    const collection = await getCollection();
    const normalizedDoc = normalizeTourPage(doc);

    const result = await collection.insertOne(normalizedDoc);

    return {
      insertedId: result.insertedId,
      document: normalizedDoc
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create tour page");
  }
}

export async function updateTourPage(tourId, updateData) {
  try {
    const collection = await getCollection();

    const existing = await collection.findOne({ tourId });

    if (!existing) {
      return null;
    }

    const merged = {
      ...existing,
      ...updateData,
      tourId: existing.tourId,
      path: updateData?.path ?? existing.path,
      createdAt: existing.createdAt,
      updatedAt: new Date()
    };

    const normalizedDoc = normalizeTourPage(merged);

    await collection.updateOne(
      { tourId },
      {
        $set: normalizedDoc
      }
    );

    return normalizedDoc;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update tour page");
  }
}

export async function upsertTourPageByTourId(tourId, doc) {
  try {
    const collection = await getCollection();

    const existing = await collection.findOne({ tourId });

    const now = new Date();

    const merged = {
      ...existing,
      ...doc,
      tourId,
      createdAt: existing?.createdAt ?? doc?.createdAt ?? now,
      updatedAt: now
    };

    const normalizedDoc = normalizeTourPage(merged);

    await collection.updateOne(
      { tourId },
      { $set: normalizedDoc },
      { upsert: true }
    );

    return normalizedDoc;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upsert tour page");
  }
}

export async function deleteTourPage(tourId) {
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({ tourId });

    return result.deletedCount > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete tour page");
  }
}