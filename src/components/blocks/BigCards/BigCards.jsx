'use client'

import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import styles from './BigCards.module.scss'



const BigCards = (props) => {
    const { content } = props

    const handleSectionButton = (section) => 
        setActiveSection(section)


  return (
    <div className = {styles["big-cards"]}>
        { content && content.map( ( item, index ) => {
                return (
                    <div className = {styles['big-cards__card-container']} onClick = {() => redirect(item.path)} key = {index}>
                        <div className = {styles["big-cards__card"]}>
                            <div className = {`${styles["big-cards__img"]}`}>
                                <img src={item.card.img.src} alt={item.card.img.alt} />
                            </div>
                            <div className = {styles["big-cards__description"]}>
                                <h3>{item.title}</h3>
                                <p>{item.brief}</p>
                                <div className={styles["big-cards__info"]}>
                                    <div className={styles["big-cards__cost"]}>
                                        <span>{item.card.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) }
    </div>
  )
}

export default BigCards