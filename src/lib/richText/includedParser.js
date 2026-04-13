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
        ? node.children.map(normalizeInlineNode).filter(Boolean)
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

function normalizeItem(item, index) {
    if (!item || typeof item !== "object") return null

    const id =
        typeof item.id === "string" && item.id.trim()
            ? item.id.trim()
            : `item-${index + 1}`

    const content = Array.isArray(item.content)
        ? item.content.map(normalizeInlineNode).filter(Boolean)
        : []

    if (!content.length) return null

    return {
        id,
        content
    }
}

function normalizeSection(section, index) {
    if (!section || typeof section !== "object") return null

    const type = section.type === "extra" ? "extra" : "included"
    const key =
        typeof section.key === "string" && section.key.trim()
            ? section.key.trim()
            : `${type}-${index + 1}`

    const fallbackTitle =
        type === "extra"
            ? "Оплачивается дополнительно"
            : "Включено в стоимость"

    const title =
        typeof section.title === "string" && section.title.trim()
            ? section.title.trim()
            : fallbackTitle

    const items = Array.isArray(section.items)
        ? section.items.map(normalizeItem).filter(Boolean)
        : []

    if (!items.length) return null

    return {
        type,
        key,
        title,
        items
    }
}

export function normalizeIncludedInfo(includedInfo) {
    if (!includedInfo || typeof includedInfo !== "object") {
        return {
            version: 1,
            sections: []
        }
    }

    const sections = Array.isArray(includedInfo.sections)
        ? includedInfo.sections.map(normalizeSection).filter(Boolean)
        : []

    return {
        version: 1,
        sections
    }
}

export function isIncludedInfoEmpty(includedInfo) {
    const parsed = normalizeIncludedInfo(includedInfo)
    return parsed.sections.length === 0
}