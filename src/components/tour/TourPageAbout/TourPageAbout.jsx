
import InfoFrame from '@/components/blocks/InfoFrame/InfoFrame'
import styles from './TourPageAbout.module.scss'
import TourInfo from '@/components/ui/TourInfo/TourInfo'

const TourPageAbout = (props) => {
    const { info } = props.tour
    const { tour, lightness } = props


  return (
<div className = {`${styles["tp-about__container"]} ${lightness ? styles[lightness] : styles['dark']}`}>
        <div className = {`${styles['tp-about']} container`}>
            <div className = {styles["tp-about__main"]}>
                <h2>{tour.aboutTitle}</h2>
                {tour.about && tour.about.map( (p, index) => <p key={index}>{p}</p>)}
            </div>
            <div className = {styles['tp-about__hit-container']}>
                <TourInfo info = {tour.info} />
                {/* <InfoFrame title = {detailsTitle} price = {price} reference = {reference} description = {details} included = {included} clothes = {clothes}/> */}
                {/* {varInfoframe && <InfoFrame title = {varDetailstitle} price = {varPrice} reference = {varReference} description = {varDetails} inlcuded = {varIncluded}/>} */}
            </div>
        </div>
    </div>
  )
}

export default TourPageAbout