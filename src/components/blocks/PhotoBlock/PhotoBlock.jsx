'use client'

import { useState } from "react"
import styles from './PhotoBlock.module.scss'

const PhotoBlock = (props) => {
    const { photos } = props

    const [showPhoto, setShowPhoto] = useState(false)
    const [photo, setPhoto] = useState('')

    const zoomOn = (src) => {
        const body = document.body;
        body.classList.add('lock');
        setShowPhoto(true)
        setPhoto(src)
    }

    const zoomOff = () => {
        setShowPhoto(false)
        const body = document.body;
        body.classList.remove('lock');
    }

  return (
    <div className = {styles['pb']}>
       {showPhoto && <div className = {styles['pb__big-photo']} onClick = {() => zoomOff()}><img src = {photo} /></div>}
        <div className = {styles['pb__container']}>
            {photos && photos.map( (photo, index) => <div className = {styles['pb__img']} key = {index}><img src={photo.path} alt = {photo.alt} onClick={() => zoomOn(photo.path)} /></div>)}
        </div>
    </div>
  )
}

export default PhotoBlock