export function serializeTourPageForClient(page) {
  return {
    ...page,
    _id: page?._id ? String(page._id) : "",
    createdAt: page?.createdAt ? page.createdAt.toISOString() : null,
    updatedAt: page?.updatedAt ? page.updatedAt.toISOString() : null,
    publishedAt: page?.publishedAt ? page.publishedAt.toISOString() : null
  };
}