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

export function normalizeAccordionGroupSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: normalizeString(safe.id, "accordionGroup"),
    type: "accordionGroup",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 5),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeText(data.title),
      items: normalizeArray(data.items).map((item, index) => {
        const safeItem = item && typeof item === "object" ? item : {}

        return {
          id: normalizeString(safeItem.id, `item-${index + 1}`),
          summary: normalizeText(safeItem.summary),
          content: normalizeRichTextDocument(safeItem.content),
          photos: normalizeArray(safeItem.photos)
            .map(normalizeImage)
            .filter((photo) => photo.src)
        }
      })
    }
  }
}