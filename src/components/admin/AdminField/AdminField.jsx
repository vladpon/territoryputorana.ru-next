import styles from "./AdminField.module.scss";

export default function AdminField({
  label,
  hint = "",
  children
}) {
  return (
    <label className={styles.field}>
      {label ? <span className={styles.field__label}>{label}</span> : null}
      {children}
      {hint ? <span className={styles.field__hint}>{hint}</span> : null}
    </label>
  );
}