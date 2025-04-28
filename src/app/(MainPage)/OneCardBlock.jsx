'use client'
import React from 'react'
import styles from './OneCardBlock.module.scss'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const OneCardBlock = () => {
  return (
    <div className={`${styles.oc} container`}>
            <div className={styles.oc__title}>
                <h2><span>Туры</span> партнеров</h2>
            </div>
            <div className={styles["oc__card-container"]}>
                <div className={styles["card-container__card"]} onClick={() => redirect('/partners#weekend')}>
                    <div className={styles["card-container__bg"]}>
                        <img src='./img/gorybezvershin.jpg'></img>
                    </div>
                    <div className={styles["card-container__text-container"]} >
                        <div className={styles["card-container__top-text"]}>
                            <div className={styles["card-container__title"]}>Горы без вершин</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["oc__link"]}><Link href = '/partners'> Перейти к турам партнеров </Link></div>
    </div>
  )
}

export default OneCardBlock