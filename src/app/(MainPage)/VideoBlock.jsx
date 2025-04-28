import React from 'react'
import styles from './ViceoBlock.module.scss'

const VideoBlock = (props) => {
    const {src, h2Text} = props
  return (
    <div className = {styles.videoBlock}>
        <h2>{h2Text}</h2>
        <video controls className='container'>
            <source src={src}  preload="metadata"></source>
        </video>
    </div>
  )
}

export default VideoBlock