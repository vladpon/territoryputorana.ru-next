function normalizeTextNode(node) {
    if (!node || typeof node !== "object") return null
    if (node.type !== "text") return null

    const text = typeof node.text === "string" ? node.text : ""
    if (!text.trim()) return null

    return {
        type: "text",
        text,
        bold: Boolean(node.bold),
        italic: Boolean(node.italic),
        underline: Boolean(node.underline)
    }
}

function normalizeLinkNode(node) {
    if (!node || typeof node !== "object") return null
    if (node.type !== "link") return null

    const href = typeof node.href === "string" ? node.href.trim() : ""
    if (!href) return null

    const children = Array.isArray(node.children)
        ? node.children
              .map((child) => normalizeInlineNode(child))
              .filter(Boolean)
        : []

    if (!children.length) return null

    return {
        type: "link",
        href,
        children
    }
}

function normalizeInlineNode(node) {
    if (!node || typeof node !== "object") return null

    if (node.type === "text") {
        return normalizeTextNode(node)
    }

    if (node.type === "link") {
        return normalizeLinkNode(node)
    }

    return null
}

function normalizeFactBlock(block, index) {
    const label = typeof block.label === "string" ? block.label.trim() : ""
    const key =
        typeof block.key === "string" && block.key.trim()
            ? block.key.trim()
            : `fact-${index + 1}`

    const value = Array.isArray(block.value)
        ? block.value.map((node) => normalizeInlineNode(node)).filter(Boolean)
        : []

    if (!label && !value.length) return null

    return {
        type: "fact",
        key,
        label,
        value
    }
}

function normalizeParagraphBlock(block) {
    const children = Array.isArray(block.children)
        ? block.children.map((node) => normalizeInlineNode(node)).filter(Boolean)
        : []

    if (!children.length) return null

    return {
        type: "paragraph",
        children
    }
}

function normalizeListBlock(block) {
    const style = block.style === "ordered" ? "ordered" : "unordered"

    const label = block.label ? normalizeInlineNode(block.label) : ''

    const items = Array.isArray(block.items)
        ? block.items
              .map((node) => normalizeInlineNode(node))
              .filter(Boolean)
        : []

    if (!items.length) return null

    return {
        type: "list",
        style,
        items,
        label
    }
}

function normalizeBlock(block, index) {
    if (!block || typeof block !== "object") return null

    if (block.type === "fact") {
        return normalizeFactBlock(block, index)
    }

    if (block.type === "paragraph") {
        return normalizeParagraphBlock(block)
    }

    if (block.type === "list") {
        return normalizeListBlock(block)
    }

    return null
}

export function normalizeInfo(info) {
    if (!info || typeof info !== "object") {
        return {
            version: 1,
            title: "",
            blocks: []
        }
    }

    const title = typeof info.title === "string" ? info.title.trim() : ""

    const blocks = Array.isArray(info.blocks)
        ? info.blocks
              .map((block, index) => normalizeBlock(block, index))
              .filter(Boolean)
        : []

    return {
        version: 1,
        title,
        blocks
    }
}

export function isInfoEmpty(info) {
    const normalized = normalizeInfo(info)
    return !normalized.title && normalized.blocks.length === 0
}