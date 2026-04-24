
// import styles from './TourPageProgram.module.scss'

// import DayCard from './DayCard'

// const TourPageProgram = (props) => {
//     const {tourProgram} = props.tour
//   return (
//     <div className={styles['tp-program__container']}>
//         <div className = {`${styles["tp-program"]} container`}>
//                 <h2>{tourProgram.programTitle}</h2>
//                 {tourProgram.programSubtitle && <h4>{tourProgram.programSubtitle}</h4>}
//                 {tourProgram.programPreface && <p>{tourProgram.programPreface}</p>}
//                 <div className = {styles['tp-program__dayscontainer']}>
//                     {tourProgram.days && tourProgram.days.map( (day, i) => <DayCard day = {day} key = {i} />)}
//                 </div>
//             </div>
//     </div>

//   )
// }

// export default TourPageProgram



import styles from "./TourPageProgram.module.scss";
import DayCard from "./DayCard";
import Section from "@/components/layout/Section/Section";

const TourPageProgram = ({ section }) => {
  const data = section?.data || {};
  const title = data.title || "";
  const subtitle = data.subtitle || "";
  const prefaceParagraphs = data?.preface?.paragraphs || [];
  const days = data.days || [];

  if (!title && !days.length) return null;

  return (
    <Section backgroundTone={section.backgroundTone}>
      <div className={styles["tp-program"]}>
        {title ? <h2>{title}</h2> : null}
        {subtitle ? <h4>{subtitle}</h4> : null}

        {prefaceParagraphs.length ? (
          <div className={styles["tp-program__preface"]}>
            {prefaceParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <div className={styles["tp-program__dayscontainer"]}>
          {days.map((day, index) => (
            <DayCard day={day} index={index} key={day.id || index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TourPageProgram;