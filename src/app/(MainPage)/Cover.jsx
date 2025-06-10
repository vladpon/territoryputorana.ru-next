'use client';

import React, { useEffect, useState} from 'react'
import styles from './MainPage.module.scss'

const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
}

const Cover = () => {
    const [shouldUseImage, setShouldUseImage] = useState(false);

    const paths = ['./img/wf01.mp4', './img/wf02.mp4', './img/wf03.mp4']
    const pathToVideo = paths[Math.floor(Math.random() * 3)];
    
    useEffect( () => {
        const vid = document.querySelector("#backgroundvideo");
        if (isSafari() && vid) {            
            const player = vid.children[0];
            if (player) {
                player.controls = false;
                player.playsinline = true;
                player.muted = true;
                player.setAttribute("muted", "");
                player.autoplay = true;

                setTimeout( () => {
                    const promise = player.play();
                    if (promise.then) {
                        promise
                        .then(() => {})
                        .catch(() => {
                            vid.style.display = "none";
                            setShouldUseImage(true);
                        })
                    }
                }, 0)
            }
        }
    }, []);


  return (
    <div className={styles.cover}>
        <div className={styles.cover__bg}>
            {shouldUseImage ? 
                (<img src={pathToVideo} alt="Muted Video" />) :  
                (<div className = {styles.vid} id = 'backgroundvideo' dangerouslySetInnerHTML={{
                    __html:`
                    <video loop muted playsinline autoplay preload="auto"><source src = "${pathToVideo}"></source></video>
                    `
                }} />)}
        </div>
        
        <div className={styles.cover__logo}>
            <img src="./img/main_logo.svg"></img>         
        </div>  

    </div>
  )
}

export default Cover