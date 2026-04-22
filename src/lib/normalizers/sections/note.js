import {
  normalizeBackgroundTone,
  normalizeBoolean,
  normalizeNumber,
  normalizeString
} from "../common"
import { normalizeRichTextDocument } from "../richText"

function normalizeColorScheme(value) {
  const allowed = ["default", "inverted", "accent", "muted"]
  return allowed.includes(value) ? value : "default"
}

function normalizeAlign(value) {
  const allowed = ["left", "center", "right"]
  return allowed.includes(value) ? value : "left"
}

function normalizeWidth(value) {
  const allowed = ["narrow", "normal", "wide"]
  return allowed.includes(value) ? value : "normal"
}

export function normalizeNoteSection(section) {
  const safe = section && typeof section === "object" ? section : {}
  const data = safe.data && typeof safe.data === "object" ? safe.data : {}
  const appearance = data.appearance && typeof data.appearance === "object" ? data.appearance : {}

  return {
    id: "note",
    type: "note",
    enabled: normalizeBoolean(safe.enabled, true),
    order: normalizeNumber(safe.order, 7),
    backgroundTone: normalizeBackgroundTone(safe.backgroundTone),
    data: {
      title: normalizeString(data.title),
      content: normalizeRichTextDocument(data.content),
      appearance: {
        colorScheme: normalizeColorScheme(appearance.colorScheme),
        titleAlign: normalizeAlign(appearance.titleAlign),
        contentAlign: normalizeAlign(appearance.contentAlign),
        width: normalizeWidth(appearance.width)
      }
    }
  }
}