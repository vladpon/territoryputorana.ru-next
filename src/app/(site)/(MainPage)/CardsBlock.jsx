'use client'

import { redirect } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './CardsBlock.module.scss'



const CardsBlock = (props) => {
    const { tours } = props;
    const numberOfCards = 6


  return (
    <div className={classNames(styles['cards-block'], 'container')}>
            <div className={styles["cards-block__title"]}>
                <h1>Плато <span>Путорана</span> туры и цены</h1>
                <p>Готовые программы для вашего путешествия и отдыха</p>
            </div>
            <div className={`${styles["cards-block__card-container"]} ${styles['card-container']}`}>

                {tours ? (
                    tours.map( (tour, index) => {
                        if (index < numberOfCards) return (
                        <div className={styles["card-container__card"]} key = {index} onClick = {() => redirect(tour.href)} >
                            <div className={styles["card-container__bg"]}>
                                <img src={tour.smallImg}></img>
                            </div>
                            <div className={styles["card-container__text-container"]}>
                                <div className={styles["card-container__top-text"]}>                                    
                                    <div className={styles["card-container__title"]}>{tour.title}</div>
                                </div>
                                <div className={styles["card-container__bottom-text"]}>
                                    <div className={styles["card-container__season"]}>{tour.season}</div>
                                    <div className={styles["card-container__days"]}> 
                                        <span>{tour.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                ) :
                <h1>No Tours found</h1>}
                
            </div>
            <div className={styles["cards-block__link"]}><Link href = '/tours'> Перейти в каталог туров </Link></div>
        </div>
  )
}

export default CardsBlock