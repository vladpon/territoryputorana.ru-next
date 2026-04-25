import {
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString,
  normalizeText
} from "../common"

export function normalizeCtaFormSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: normalizeString(safe.id, "cta"),
    type: "ctaForm",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 6),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeText(data.title),
      subtitle: normalizeText(data.subtitle),
      buttonText: normalizeText(data.buttonText),
      successMessage: normalizeText(data.successMessage),
      image: normalizeImage(data.image)
    }
  }
}