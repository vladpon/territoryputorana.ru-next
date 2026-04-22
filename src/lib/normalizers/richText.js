import { normalizeArray, normalizeString } from "./common"

function normalizeTextNode(node) {
  const safe = node && typeof node === "object" ? node : {}

  return {
    type: "text",
    text: normalizeString(safe.text),
    ...(safe.bold === true ? { bold: true } : {}),
    ...(safe.italic === true ? { italic: true } : {}),
    ...(safe.underline === true ? { underline: true } : {})
  }
}

function normalizeLinkNode(node) {
  const safe = node && typeof node === "object" ? node : {}

  return {
    type: "link",
    href: normalizeString(safe.href),
    target: safe.target === "_blank" ? "_blank" : "_self",
    content: normalizeArray(safe.content)
      .map(normalizeInlineNode)
      .filter(Boolean)
  }
}

export function normalizeInlineNode(node) {
  if (!node || typeof node !== "object") return null

  if (node.type === "text") {
    const normalized = normalizeTextNode(node)
    return normalized.text ? normalized : null
  }

  if (node.type === "link") {
    const normalized = normalizeLinkNode(node)
    return normalized.href && normalized.content.length ? normalized : null
  }

  return null
}

function normalizeParagraphBlock(block, index) {
  const safe = block && typeof block === "object" ? block : {}

  const content = normalizeArray(safe.content)
    .map(normalizeInlineNode)
    .filter(Boolean)

  return {
    id: normalizeString(safe.id, `p${index + 1}`),
    type: "paragraph",
    content
  }
}

function normalizeListBlock(block, index) {
  const safe = block && typeof block === "object" ? block : {}

  const items = normalizeArray(safe.items)
    .map((item, itemIndex) => {
      const safeItem = item && typeof item === "object" ? item : {}

      const children = normalizeArray(safeItem.children)
        .map(normalizeInlineNode)
        .filter(Boolean)

      return {
        id: normalizeString(safeItem.id, `item-${itemIndex + 1}`),
        children
      }
    })
    .filter((item) => item.children.length > 0)

  return {
    id: normalizeString(safe.id, `list${index + 1}`),
    type: "list",
    style: safe.style === "ordered" ? "ordered" : "unordered",
    items
  }
}

function normalizeBlock(block, index) {
  if (!block || typeof block !== "object") return null

  if (block.type === "paragraph") {
    return normalizeParagraphBlock(block, index)
  }

  if (block.type === "list") {
    return normalizeListBlock(block, index)
  }

  return null
}

export function normalizeRichTextDocument(doc) {
  const safe = doc && typeof doc === "object" ? doc : {}

  const blocks = normalizeArray(safe.blocks)
    .map(normalizeBlock)
    .filter(Boolean)
    .filter((block) => {
      if (block.type === "paragraph") return block.content.length > 0
      if (block.type === "list") return block.items.length > 0
      return false
    })

  return {
    version: 1,
    blocks
  }
}