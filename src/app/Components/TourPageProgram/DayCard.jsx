// 'use client'

// import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './DayCard.module.scss'

const DayCard = (props) => {
    const { dayTitle, dayDesc, dayImg} = props.day

    // const [opened, setOpened] = useState(false)

    // useEffect( () => {
    //     console.log(opened)
    // }, [opened])


  return (
    // <div className = {`${styles["day"]} ${opened && styles.day_opened }`} onClick = { () => opened ? setOpened(false) : setOpened(true)}>
    <div className = {styles.day}>
                
                <div className = {styles['day__content']}>
                    <div className = {styles["day__text"]}>
                        <div className = {`${styles["day__title"]}`}>
                            <h3>{dayTitle}</h3>
                            {/* <img src={'/img/arrow.svg'}></img> */}
                        </div>
                        {dayDesc && dayDesc.map( (p, index) => <p key = {index}>{p}</p>)}
                    </div>
                    <div className={styles["day__img"]}>
                        <Image 
                            src={dayImg}
                            alt=""
                            width={857}
                            height={500} />
                    </div>
                </div>
    </div>   
  )
}

export default DayCard