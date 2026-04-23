import Section from "@/components/layout/Section/Section";
import InlineRichText from "@/components/ui/RichText/InlineRichText";
import styles from "./NoteBlock.module.scss";

function renderBlock(block, index) {
  if (block.type === "paragraph") {
    return (
      <p key={block.id || index} className={styles.note__paragraph}>
        <InlineRichText
          nodes={block.content || []}
          keyPrefix={`note-paragraph-${index}`}
        />
      </p>
    );
  }

  if (block.type === "list") {
    const Tag = block.style === "ordered" ? "ol" : "ul";

    return (
      <Tag key={block.id || index} className={styles.note__list}>
        {(block.items || []).map((item, itemIndex) => (
          <li
            key={item.id || `${index}-${itemIndex}`}
            className={styles.note__listItem}
          >
            <InlineRichText
              nodes={item.children || []}
              keyPrefix={`note-list-${index}-${itemIndex}`}
            />
          </li>
        ))}
      </Tag>
    );
  }

  return null;
}

function getColorSchemeClass(colorScheme) {
  switch (colorScheme) {
    case "inverted":
      return styles.note_inverted;
    case "accent":
      return styles.note_accent;
    case "muted":
      return styles.note_muted;
    default:
      return styles.note_default;
  }
}

function getWidthClass(width) {
  switch (width) {
    case "narrow":
      return styles.note_narrow;
    case "wide":
      return styles.note_wide;
    default:
      return styles.note_normal;
  }
}

export default function NoteBlock({
  title = "",
  content = { version: 1, blocks: [] },
  backgroundTone = "light",
  colorScheme = "default",
  titleAlign = "left",
  contentAlign = "left",
  width = "normal"
}) {
  const colorSchemeClass = getColorSchemeClass(colorScheme);
  const widthClass = getWidthClass(width);

  if (!title && !content?.blocks?.length) return null;

  return (
    <Section backgroundTone={backgroundTone}>
      <div className={`${styles.note} ${colorSchemeClass} ${widthClass}`}>
        {title ? (
          <h2 className={styles.note__title} style={{ textAlign: titleAlign }}>
            {title}
          </h2>
        ) : null}

        <div className={styles.note__content} style={{ textAlign: contentAlign }}>
          {(content.blocks || []).map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </Section>
  );
}