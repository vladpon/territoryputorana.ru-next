
import styles from './TourPageCover.module.scss'

const TourPageCover = (props) => {
    const { title, time, varTime, season, bigImg } = props.tour
    const { children } = props
  return (
    <div className = {styles["tp-cover"]}>
        {children}        
        <img className = {styles["tp-cover__bg"]} src={bigImg} />        
        <div className = {`${styles["tp-cover__text"]} container`}>
            <h1>{title}</h1>
            {time && 
                (
                <div className = {styles['tp-cover__opt-block']}>
                    <div className = {styles['tp-cover__opt-item']}>
                        <img src='./img/time.png' />
                        <span>{time}</span>
                        {(varTime) && (<span>; {varTime}</span>)}
                    </div>
                    <div className = {styles['tp-cover__opt-item']}>
                        <img src='./img/calendar.png' />
                        <span>{season}</span>
                    </div>
                </div>
                )
            }
        </div>
    </div>
    )
}

export default TourPageCover