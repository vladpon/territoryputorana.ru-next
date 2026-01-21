
import styles from './ViceoBlock.module.scss'

const VideoBlock = (props) => {
    const { src } = props
  return (
    <div className = {styles.videoBlock}>
        <h2>Покори <span>Север</span> с нами!</h2>
        <video controls className='container'>
            <source src={src}  preload="metadata"></source>
        </video>
    </div>
  )
}

export default VideoBlock