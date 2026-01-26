
import styles from './ViceoBlock.module.scss'

const VideoBlock = (props) => {
    const { src } = props
  return (
    <div className = {`${styles.videoBlock}`}>
        <div className={`${styles.videoBlock__title} container`}>
          <h2>Покори <span>Север</span> с нами!</h2>
          <p>Отдых с комфортом в окружении дикой природы</p>
        </div>
        <video controls className='container'>
            <source src={src}  preload="metadata"></source>
        </video>
    </div>
  )
}

export default VideoBlock