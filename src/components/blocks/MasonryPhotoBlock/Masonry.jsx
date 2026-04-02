'use client'
import { useState } from 'react'
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

import styles from './Masonry.module.scss'

const Masonry = (props) => {
    const {title, arrPhotos} = props

    
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState(arrPhotos)



    return (<div className = {`${styles['gallery__block']} container`}>
                <div className = {styles['gallery__title']}><h2>{title}</h2></div>
                <div className = {styles['gallery__photo-container']}>                
                    {photos && photos.map( (photo, index) => 
                    {
                        if(index < 6) {
                            return <div className = {styles['gallery__photo']} key = {index} onClick={() => setIndex(index)}><img src = {photo.tn} /></div>
                        }
                        else return
                    })}
                </div>
                <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={photos}
            />
            </div>)
}


export default Masonry