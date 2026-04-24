export function normalizeText(value, fallback = "") {
  return typeof value === "string" ? value : fallback
}


export function normalizeString(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback
}

export function normalizeBoolean(value, fallback = false) {
  return typeof value === "boolean" ? value : fallback
}

export function normalizeNumber(value, fallback = 0) {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

export function normalizeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback
}

export function normalizeBackgroundTone(value) {
  return value === "dark" ? "dark" : "light"
}

export function normalizeImage(value) {
  const image = value && typeof value === "object" ? value : {}

  return {
    src: normalizeString(image.src),
    alt: normalizeString(image.alt)
  }
}