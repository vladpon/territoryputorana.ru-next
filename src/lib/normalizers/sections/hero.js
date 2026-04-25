import {
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString,
  normalizeText
} from "../common"

export function normalizeHeroSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: normalizeString(safe.id, "hero"),
    type: "hero",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 1),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeText(data.title),
      image: normalizeImage(data.image)
    }
  }
}