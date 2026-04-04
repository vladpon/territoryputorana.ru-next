
import styles from './TourPageProgram.module.scss'

import DayCard from './DayCard'

const TourPageProgram = (props) => {
    const {tourProgram} = props.tour
  return (
    <div className={styles['tp-program__container']}>
        <div className = {`${styles["tp-program"]} container`}>
                <h2>{tourProgram.programTitle}</h2>
                {tourProgram.programSubtitle && <h4>{tourProgram.programSubtitle}</h4>}
                {tourProgram.programPreface && <p>{tourProgram.programPreface}</p>}
                <div className = {styles['tp-program__dayscontainer']}>
                    {tourProgram.days && tourProgram.days.map( (day, i) => <DayCard day = {day} key = {i} />)}
                </div>
            </div>
    </div>

  )
}

export default TourPageProgram