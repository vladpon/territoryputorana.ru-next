import { Fragment } from "react"
import { normalizeIncludedInfo } from "@/lib/richText/includedParser"
import styles from "./IncludedInfo.module.scss"

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
            {node.children.map((child, index) =>
                renderInlineNode(child, `${key}-${index}`)
            )}
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

function renderInlineContent(nodes = [], keyPrefix = "inline") {
    return nodes.map((node, index) =>
        renderInlineNode(node, `${keyPrefix}-${index}`)
    )
}

export default function IncludedInfo({ includedInfo }) {


    const parsed = normalizeIncludedInfo(includedInfo)

    if (!parsed.sections.length) return null

    return (
        <div className={styles.includedInfo}>
            {parsed.sections.map((section) => (
                <section
                    key={section.key}
                    className={`${styles.section} ${
                        section.type === "extra" ? styles.extra : styles.included
                    }`}
                >
                    <span className={styles.title}>{section.title}</span>

                    <ul className={styles.list}>
                        {section.items.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.marker} />
                                <div className={styles.content}>
                                    {renderInlineContent(
                                        item.content,
                                        `${section.key}-${item.id}`
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}