// import Container from "../Container/Container";
// import styles from "./Section.module.scss";

// export default function Section({ children, className }) {
//   return (
//     <section className={`${styles.section} ${className}`}>
//       <Container>
//         {children}
//       </Container>
//     </section>
//   );
// }





import styles from "./Section.module.scss";
import Container from "../Container/Container";

export default function Section({
  children,
  backgroundTone = "light"
}) {
  const toneClass =
    backgroundTone === "dark" ? styles.section_dark : styles.section_light;

  return (
    <section className={`${styles.section} ${toneClass}`}>
      <Container>
        {children}
      </Container>
    </section>
  );
}