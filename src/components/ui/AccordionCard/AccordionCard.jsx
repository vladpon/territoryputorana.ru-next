"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./AccordionCard.module.scss";

export default function AccordionCard({
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.card} container`}>
      <button className={styles.header} onClick={toggle}>
        <span className={styles.title}>{title}</span>

        <span
          className={`${styles.icon} ${
            isOpen ? styles.iconOpen : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={styles.content}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
        }}
      >
        <div ref={contentRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
}