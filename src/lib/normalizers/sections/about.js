import {
  normalizeArray,
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeNumber,
  normalizeString
} from "../common"
import { normalizeInlineNode, normalizeRichTextDocument } from "../richText"

function normalizeFact(fact, index) {
  const safe = fact && typeof fact === "object" ? fact : {}

  return {
    id: normalizeString(safe.id, `fact-${index + 1}`),
    label: normalizeString(safe.label),
    value: normalizeArray(safe.value)
      .map(normalizeInlineNode)
      .filter(Boolean)
  }
}

function normalizeDetailsContentBlock(block, index) {
  if (!block || typeof block !== "object") return null

  if (block.type === "paragraph") {
    const content = normalizeArray(block.content)
      .map(normalizeInlineNode)
      .filter(Boolean)

    return {
      id: normalizeString(block.id, `p${index + 1}`),
      type: "paragraph",
      content
    }
  }

  if (block.type === "list") {
    const items = normalizeArray(block.items)
      .map((item, itemIndex) => {
        const children = normalizeArray(item?.children)
          .map(normalizeInlineNode)
          .filter(Boolean)

        return {
          id: normalizeString(item?.id, `item-${itemIndex + 1}`),
          children
        }
      })
      .filter((item) => item.children.length > 0)

    return {
      id: normalizeString(block.id, `list${index + 1}`),
      type: "list",
      style: block.style === "ordered" ? "ordered" : "unordered",
      items
    }
  }

  return null
}

export function normalizeAboutSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}
  const aboutTour = data.aboutTour && typeof data.aboutTour === "object" ? data.aboutTour : {}
  const tourInfo = data.tourInfo && typeof data.tourInfo === "object" ? data.tourInfo : {}
  const details = tourInfo.details && typeof tourInfo.details === "object" ? tourInfo.details : {}

  return {
    id: "about",
    type: "about",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 2),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      aboutTour: {
        title: normalizeString(aboutTour.title),
        text: {
          paragraphs: normalizeArray(aboutTour?.text?.paragraphs)
            .map((item) => normalizeString(item))
            .filter(Boolean)
        }
      },
      tourInfo: {
        title: normalizeString(tourInfo.title),
        facts: normalizeArray(tourInfo.facts)
          .map(normalizeFact)
          .filter((fact) => fact.label || fact.value.length > 0),
        details: {
          summary: normalizeString(details.summary),
          content: normalizeArray(details.content)
            .map(normalizeDetailsContentBlock)
            .filter(Boolean)
        }
      }
    }
  }
}