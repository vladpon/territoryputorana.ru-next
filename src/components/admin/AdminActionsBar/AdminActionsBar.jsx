import styles from "./AdminActionsBar.module.scss";

export default function AdminActionsBar({
  isSaving = false,
  saveLabel = "Сохранить",
  error = "",
  success = ""
}) {
  return (
    <div className={styles.bar}>
      <button
        type="submit"
        className={styles.bar__button}
        disabled={isSaving}
      >
        {isSaving ? "Сохранение..." : saveLabel}
      </button>

      <div className={styles.bar__messages}>
        {error ? <span className={styles.bar__error}>{error}</span> : null}
        {success ? <span className={styles.bar__success}>{success}</span> : null}
      </div>
    </div>
  );
}