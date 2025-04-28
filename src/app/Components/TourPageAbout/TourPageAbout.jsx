
import InfoFrame from '../InfoFrame/InfoFrame'
import styles from './TourPageAbout.module.scss'

const TourPageAbout = (props) => {
    const {about, aboutTitle, detailsTitle, price, reference, details, included, clothes, varDetailstitle, varPrice, varReference, varDetails, varIncluded} = props.tour
    const varInfoframe = props.varInfoframe


  return (
<div className = {styles["tp-about__container"]}>
        <div className = {`${styles['tp-about']} container`}>
            <div className = {styles["tp-about__main"]}>
                <h2>{aboutTitle}</h2>
                {about && about.map( (p, index) => <p key={index}>{p}</p>)}
            </div>
            <div className = {styles['tp-about__hit-container']}>
                <InfoFrame title = {detailsTitle} price = {price} reference = {reference} description = {details} included = {included} clothes = {clothes}/>
                {varInfoframe && <InfoFrame title = {varDetailstitle} price = {varPrice} reference = {varReference} description = {varDetails} inlcuded = {varIncluded}/>}
            </div>
        </div>
    </div>
  )
}

export default TourPageAbout