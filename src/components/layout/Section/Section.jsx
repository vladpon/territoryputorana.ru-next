import Container from "../Container/Container";
import styles from "./Section.module.scss";

export default function Section({ children, className }) {
  return (
    <section className={`${styles.section} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  );
}