import {
  normalizeArray,
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString,
  normalizeText
} from "../common"

export function normalizeGallerySection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: normalizeString(safe.id, "gallery"),
    type: "gallery",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 4),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeText(data.title),
      photos: normalizeArray(data.photos)
        .map(normalizeImage)
        .filter((photo) => photo.src)
    }
  }
}