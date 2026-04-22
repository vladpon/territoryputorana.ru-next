import {
  normalizeArray,
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeNumber,
  normalizeString
} from "../common"
import { normalizeRichTextDocument } from "../richText"

export function normalizeAccordionGroupSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}

  return {
    id: "accordionGroup",
    type: "accordionGroup",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 5),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeString(data.title),
      items: normalizeArray(data.items).map((item, index) => {
        const safeItem = item && typeof item === "object" ? item : {}

        return {
          id: normalizeString(safeItem.id, `item-${index + 1}`),
          summary: normalizeString(safeItem.summary),
          content: normalizeRichTextDocument(safeItem.content)
        }
      })
    }
  }
}