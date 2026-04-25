import Section from "@/components/layout/Section/Section";
import AccordionCard from "@/components/ui/AccordionCard/AccordionCard";
import RichTextContent from "@/components/ui/RichText/RichTextContent";
import PhotoSlider from "@/components/ui/PhotoSlider/PhotoSlider";
import styles from "./AccordionGroupBlock.module.scss";

export default function AccordionGroupBlock({
  title = "",
  items = [],
  backgroundTone = "light",
  className = ""
}) {
  if (!title && !items.length) return null;

  return (
    <Section backgroundTone={backgroundTone}>
      <div className={`${styles.group} ${className}`.trim()}>
        {title ? <h2 className={styles.group__title}>{title}</h2> : null}

        <div className={styles.group__items}>
          {items.map((item, index) => (
            <AccordionCard
              key={item.id || index}
              summary={item.summary || ""}
              className={styles.group__card}
            >
              <RichTextContent content={item.content} />

              {item.photos?.length ? (
                <div className={styles.group__slider}>
                  <PhotoSlider photos={item.photos} />
                </div>
              ) : null}
            </AccordionCard>
          ))}
        </div>
      </div>
    </Section>
  );
}