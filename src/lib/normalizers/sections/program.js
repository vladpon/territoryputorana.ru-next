import {
  normalizeArray,
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString,
  normalizeText
} from "../common"
import { normalizeRichTextDocument } from "../richText"

export function normalizeProgramSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: normalizeString(safe.id, "program"),
    type: "program",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 3),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeText(data.title),
      subtitle: normalizeText(data.subtitle),
      preface: {
        paragraphs: normalizeArray(data?.preface?.paragraphs)
          .map((item) => normalizeText(item))
          .filter(Boolean)
      },
      days: normalizeArray(data.days).map((day, index) => {
        const safeDay = day && typeof day === "object" ? day : {}

        return {
          id: normalizeString(safeDay.id, `day-${index + 1}`),
          title: normalizeText(safeDay.title),
          photos: normalizeArray(safeDay.photos)
            .map(normalizeImage)
            .filter((photo) => photo.src),
          description: normalizeRichTextDocument(safeDay.description)
        }
      })
    }
  }
}