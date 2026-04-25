// "use client";

// import { useState, useRef, useEffect } from "react";
// import styles from "./AccordionCard.module.scss";

// export default function AccordionCard({
//   title,
//   children,
//   defaultOpen = false,
//   className
// }) {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (contentRef.current) {
//       setHeight(contentRef.current.scrollHeight);
//     }
//   }, [children, isOpen]);

//   const toggle = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <div className={`${styles.card} ${className}`}>
//       <button className={styles.header} onClick={toggle}>
//         <span className={styles.title}>{title}</span>

//         <span
//           className={`${styles.icon} ${
//             isOpen ? styles.iconOpen : ""
//           }`}
//         >
//           +
//         </span>
//       </button>

//       <div
//         className={styles.content}
//         style={{
//           maxHeight: isOpen ? `${height}px` : "0px",
//         }}
//       >
//         <div ref={contentRef} className={styles.inner}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AccordionCard.module.scss";

export default function AccordionCard({
  title = "",
  summary = "",
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  titleClassName = "",
  icon = "+"
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(defaultOpen ? "none" : "0px");

  const label = summary || title || "";

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, children]);

  if (!label && !children) return null;

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <button
        type="button"
        className={`${styles.header} ${headerClassName}`.trim()}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={`${styles.title} ${titleClassName}`.trim()}>
          {label}
        </span>

        <span
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`.trim()}
          aria-hidden="true"
        >
          {icon}
        </span>
      </button>

      <div
        className={`${styles.content} ${contentClassName}`.trim()}
        style={{ maxHeight }}
      >
        <div ref={contentRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
}