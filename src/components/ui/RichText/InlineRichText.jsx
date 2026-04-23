import { Fragment } from "react";
import styles from "./InlineRichText.module.scss";

function isExternalLink(href = "") {
  return /^https?:\/\//i.test(href);
}

function renderTextNode(node, key) {
  let content = node.text;

  if (node.bold) {
    content = <strong>{content}</strong>;
  }

  if (node.italic) {
    content = <em>{content}</em>;
  }

  if (node.underline) {
    content = <span className={styles.underline}>{content}</span>;
  }

  return <Fragment key={key}>{content}</Fragment>;
}

function renderLinkNode(node, key) {
  return (
    <a
      key={key}
      href={node.href}
      target={isExternalLink(node.href) ? "_blank" : undefined}
      rel={isExternalLink(node.href) ? "noreferrer noopener" : undefined}
    >
      {(node.content || []).map((child, index) =>
        renderInlineNode(child, `${key}-${index}`)
      )}
    </a>
  );
}

export function renderInlineNode(node, key) {
  if (!node || typeof node !== "object") return null;

  if (node.type === "text") {
    return renderTextNode(node, key);
  }

  if (node.type === "link") {
    return renderLinkNode(node, key);
  }

  return null;
}

export default function InlineRichText({ nodes = [], keyPrefix = "inline" }) {
  return nodes.map((node, index) =>
    renderInlineNode(node, `${keyPrefix}-${index}`)
  );
}