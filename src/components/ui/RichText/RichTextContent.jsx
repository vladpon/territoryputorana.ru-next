import InlineRichText from "./InlineRichText";
import styles from "./RichTextContent.module.scss";

function renderBlock(block, index) {
  if (block.type === "paragraph") {
    return (
      <p key={block.id || index} className={styles.paragraph}>
        <InlineRichText
          nodes={block.content || []}
          keyPrefix={`rt-paragraph-${index}`}
        />
      </p>
    );
  }

  if (block.type === "list") {
    const Tag = block.style === "ordered" ? "ol" : "ul";

    return (
      <Tag key={block.id || index} className={styles.list}>
        {(block.items || []).map((item, itemIndex) => (
          <li
            key={item.id || `${index}-${itemIndex}`}
            className={styles.listItem}
          >
            <InlineRichText
              nodes={item.children || []}
              keyPrefix={`rt-list-${index}-${itemIndex}`}
            />
          </li>
        ))}
      </Tag>
    );
  }

  return null;
}

export default function RichTextContent({ content }) {
  const blocks = content?.blocks || [];

  if (!blocks.length) return null;

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
}