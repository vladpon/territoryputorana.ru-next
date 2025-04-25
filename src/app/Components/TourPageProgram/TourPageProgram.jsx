import styles from './TourPageProgram.module.scss'

const TourPageProgram = (props) => {
    const {tourProgram} = props.tour
  return (
    <div className={styles['tp-program__container']}>
        <div className = {`${styles["tp-program"]} container`}>
                <h2>{tourProgram.programTitle}</h2>
                {tourProgram.programSubtitle && <h4>{tourProgram.programSubtitle}</h4>}
                {tourProgram.programPreface && <p>{tourProgram.programPreface}</p>}
                {tourProgram.days && tourProgram.days.map( (day) => {
                    return <div className = {styles["tp-program__day"]} key = {day.dayTitle}>
                                <div className = {styles["tp-program__text"]}>
                                    <h3>{day.dayTitle}</h3>
                                    {day.dayDesc && day.dayDesc.map( (p, index) => <p key = {index}>{p}</p>)}
                                </div>
                                <div className={styles["tp-program__img"]}>
                                    <img src={day.dayImg} />
                                </div>
                            </div>   
                })}               
            </div>
    </div>

  )
}

export default TourPageProgram