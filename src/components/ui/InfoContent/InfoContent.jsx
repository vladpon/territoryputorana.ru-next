import { Fragment } from "react"
import { normalizeInfo } from "@/lib/richText/infoParser"
import styles from "./InfoContent.module.scss"

function isExternalLink(href = "") {
    return /^https?:\/\//i.test(href)
}

function renderTextNode(node, key) {
    let content = node.text

    if (node.bold) {
        content = <strong>{content}</strong>
    }

    if (node.italic) {
        content = <em>{content}</em>
    }

    if (node.underline) {
        content = <span className={styles.underline}>{content}</span>
    }

    return <Fragment key={key}>{content}</Fragment>
}

function renderLinkNode(node, key) {
    return (
        <a
            key={key}
            href={node.href}
            target={isExternalLink(node.href) ? "_blank" : undefined}
            rel={isExternalLink(node.href) ? "noreferrer noopener" : undefined}
        >
            {node.children.map((child, index) => renderInlineNode(child, `${key}-${index}`))}
        </a>
    )
}

function renderInlineNode(node, key) {
    if (node.type === "text") {
        return renderTextNode(node, key)
    }

    if (node.type === "link") {
        return renderLinkNode(node, key)
    }

    return null
}

function renderInlineNodes(nodes = [], keyPrefix = "inline") {
    return nodes.map((node, index) => renderInlineNode(node, `${keyPrefix}-${index}`))
}

function renderBlock(block, index) {
    if (block.type === "fact") {
        return (
            <div key={block.key || index} className={styles.factRow}>
                <div className={styles.factLabel}>{block.label}</div>
                <div className={styles.factValue}>
                    {renderInlineNodes(block.value, `fact-${index}`)}
                </div>
            </div>
        )
    }

    if (block.type === "paragraph") {
        return (
            <p key={index} className={styles.paragraph}>
                {renderInlineNodes(block.children, `paragraph-${index}`)}
            </p>
        )
    }

    if (block.type === "list") {
        const Tag = block.style === "ordered" ? "ol" : "ul"

        return (
            <Tag key={index} className={styles.list}>
                {block.items.map((item, itemIndex) => (
                    <li key={`${index}-${itemIndex}`} className={styles.listItem}>
                        {renderInlineNodes(item.children, `list-${index}-${itemIndex}`)}
                    </li>
                ))}
            </Tag>
        )
    }

    return null
}

export default function InfoContent({ info }) {
    const parsed = normalizeInfo(info)

    if (!parsed.title && !parsed.blocks.length) return null

    return (
        <div className={styles.info}>
            {parsed.title ? <h3 className={styles.title}>{parsed.title}</h3> : null}

            <div className={styles.blocks}>
                {parsed.blocks.map((block, index) => renderBlock(block, index))}
            </div>
        </div>
    )
}