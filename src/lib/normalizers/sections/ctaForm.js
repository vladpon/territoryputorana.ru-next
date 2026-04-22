import {
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString
} from "../common"

export function normalizeCtaFormSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: "cta",
    type: "ctaForm",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 6),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeString(data.title),
      subtitle: normalizeString(data.subtitle),
      buttonText: normalizeString(data.buttonText),
      successMessage: normalizeString(data.successMessage),
      image: normalizeImage(data.image)
    }
  }
}