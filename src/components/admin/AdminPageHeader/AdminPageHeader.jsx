import styles from "./AdminPageHeader.module.scss";

export default function AdminPageHeader({
  title = "",
  subtitle = "",
  actions = null
}) {
  return (
    <div className={styles.header}>
      <div className={styles.header__main}>
        {title ? <h1 className={styles.header__title}>{title}</h1> : null}
        {subtitle ? <p className={styles.header__subtitle}>{subtitle}</p> : null}
      </div>

      {actions ? <div className={styles.header__actions}>{actions}</div> : null}
    </div>
  );
}