import styles from "./AdminStatusBadge.module.scss";

const labelMap = {
  draft: "Черновик",
  published: "Опубликован",
  archived: "Архив"
};

export default function AdminStatusBadge({ status = "draft" }) {
  const safeStatus = ["draft", "published", "archived"].includes(status)
    ? status
    : "draft";

  return (
    <span className={`${styles.badge} ${styles[`badge_${safeStatus}`]}`}>
      {labelMap[safeStatus]}
    </span>
  );
}