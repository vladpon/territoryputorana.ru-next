import React from 'react'
import styles from './TextFewImages.module.scss';

const TextFewImages = (props) => {
    const {textFewImages} = props

  return (
    <div className = {`${styles["txt-fimg"]} container`}>
        <div className = {styles["txt-fimg__ph-container"]}>
            { textFewImages.photo ? (
                textFewImages.photo.map( (photo, index) => <div className = {styles["txt-fimg__photo"]} key = {index}><img src={photo} /></div>
                )
            ) : <h3>no photo found</h3>
            }                
        </div>
        <div className={styles["txt-fimg__text"]}>
            <h2>{textFewImages.title_h2}</h2>
            <h3>{textFewImages.title_h3}</h3>
            <p>{textFewImages.text}</p>
        </div>
    </div>
  )
}

export default TextFewImages