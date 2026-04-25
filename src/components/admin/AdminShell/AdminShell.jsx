import styles from "./AdminShell.module.scss";

export default function AdminShell({ children }) {
  return <div className={styles.shell}>{children}</div>;
}