// import { Fragment } from "react"
// import { normalizeInfo } from "@/lib/richText/infoParser"
// import styles from "./TourInfo.module.scss"
// import IncludedInfo from "../IncludedInfo/IncludedInfo"

// function isExternalLink(href = "") {
//     return /^https?:\/\//i.test(href)
// }

// function renderTextNode(node, key) {
//     let content = node.text

//     if (node.bold) {
//         content = <strong>{content}</strong>
//     }

//     if (node.italic) {
//         content = <em>{content}</em>
//     }

//     if (node.underline) {
//         content = <span className={styles.underline}>{content}</span>
//     }

//     return <Fragment key={key}>{content}</Fragment>
// }

// function renderLinkNode(node, key) {
//     return (
//         <a
//             key={key}
//             href={node.href}
//             target={isExternalLink(node.href) ? "_blank" : undefined}
//             rel={isExternalLink(node.href) ? "noreferrer noopener" : undefined}
//         >
//             {node.children.map((child, index) => renderInlineNode(child, `${key}-${index}`))}
//         </a>
//     )
// }

// function renderInlineNode(node, key) {
//     if (node.type === "text") {
//         return renderTextNode(node, key)
//     }

//     if (node.type === "link") {
//         return renderLinkNode(node, key)
//     }

//     return null
// }

// function renderInlineNodes(nodes = [], keyPrefix = "inline") {
//     return nodes.map((node, index) => renderInlineNode(node, `${keyPrefix}-${index}`))
// }

// function renderBlock(block, index) {


//     if (block.type === "fact") {
//         return (
//             <div key={block.key || index} className={styles.factRow}>
//                 <div className={styles.factLabel}>{block.label}</div>
//                 <div className={styles.factValue}>
//                     {renderInlineNodes(block.value, `fact-${index}`)}
//                 </div>
//             </div>
//         )
//     }

//     if (block.type === "paragraph") {
//         return (
//             <p key={index} className={styles.paragraph}>
//                 {renderInlineNodes(block.children, `paragraph-${index}`)}
//             </p>
//         )
//     }

//     if (block.type === "list") {
//         const Tag = block.style === "ordered" ? "ol" : "ul"

//         return (
//             <Fragment key={index} >
//                 {block.label && <span className = {styles.listLabel}>{renderInlineNode(block.label)}</span>}
//                 <Tag className={styles.list}>
//                     {block.items.map((item, itemIndex) => (
//                         <li key={`${index}-${itemIndex}`} className={styles.listItem}>
//                             {renderInlineNode(item, `list-${index}-${itemIndex}`)}
//                         </li>
//                     ))}
//                 </Tag>
                
//             </Fragment>
//         )
//     }

//     return null
// }

// export default function TourInfo({ info, includedInfo }) {
    
//     const parsed = normalizeInfo(info)

//     if (!parsed.title && !parsed.blocks.length) return null

//     return (
//         <div className={styles.info}>
//             {parsed.title ? <h3 className={styles.title}>{parsed.title}</h3> : null}

//             <div className={styles.blocks}>
//                 {parsed.blocks.map((block, index) => renderBlock(block, index))}
//             </div>
//             {includedInfo && <details className = {styles.infoframe}>
//                                 <summary className = {`${styles['infoframe__note']} ${styles['infoframe__note_included']}`}><span>*Что включено?</span></summary>
//                                 {/* <div className = {styles['modal__text']} dangerouslySetInnerHTML={{__html: included}}></div> */}
//                                 <IncludedInfo includedInfo={includedInfo} />
//                             </details>}
//         </div>
//     )
// }













import InlineRichText from "@/components/ui/RichText/InlineRichText";
import styles from "./TourInfo.module.scss";

function renderDetailsBlock(block, index) {
  if (block.type === "paragraph") {
    return (
      <p key={block.id || index} className={styles.paragraph}>
        <InlineRichText
          nodes={block.content || []}
          keyPrefix={`paragraph-${index}`}
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
              keyPrefix={`list-${index}-${itemIndex}`}
            />
          </li>
        ))}
      </Tag>
    );
  }

  return null;
}

export default function TourInfo({ tourInfo }) {
  const title = tourInfo?.title || "";
  const facts = tourInfo?.facts || [];
  const details = tourInfo?.details || null;

  if (!title && !facts.length) return null;

  return (
    <div className={styles.info}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}

      <div className={styles.blocks}>
        {facts.map((fact, index) => (
          <div key={fact.id || index} className={styles.factRow}>
            <div className={styles.factLabel}>{fact.label}</div>
            <div className={styles.factValue}>
              <InlineRichText
                nodes={fact.value || []}
                keyPrefix={`fact-${index}`}
              />
            </div>
          </div>
        ))}
      </div>

      {details?.summary ? (
        <details className={styles.details}>
          <summary
            className={styles.details__summary}
          >
            <span>{details.summary}</span>
          </summary>

          <div className={styles["details__content"]}>
            {(details.content || []).map((block, index) =>
              renderDetailsBlock(block, index)
            )}
          </div>
        </details>
      ) : null}
    </div>
  );
}