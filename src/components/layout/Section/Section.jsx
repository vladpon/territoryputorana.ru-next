import Container from "../Container/Container";
import styles from "./Section.module.scss";

export default function Section({ children }) {
  return (
    <section className={styles.section}>
      <Container>
        {children}
      </Container>
    </section>
  );
}