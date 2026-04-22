import {
  normalizeArray,
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString
} from "../common"

export function normalizeGallerySection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: "gallery",
    type: "gallery",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 4),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeString(data.title),
      photos: normalizeArray(data.photos)
        .map(normalizeImage)
        .filter((photo) => photo.src)
    }
  }
}