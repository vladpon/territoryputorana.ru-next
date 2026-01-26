import MainLogo from '../Components/MainLogo/MainLogo'
import BigCards from '../Components/BigCards/BigCards'

import styles from './Tours.module.scss'
import { getTours } from '@/lib/mongo/tours'

export const metadata = {
    title: 'Туры на Плато Путорана из Красноярска в 2025 году',
    description: 'Туры на Плато Путорана из Красноярска в 2023 году – Все туристические маршруты на Плато Путорана можно найти на сайте или узнать по телефону 8 (903) 929-93-83. Плато Путорана туры и цены на 2023 году вылет на Плато из Красноярска. Бронируйте и покупайте туры на Плато Путорана онлайн на сайте'
}


const ToursPage = async () => {

    const tours = await getTours().then( res => JSON.parse(JSON.stringify(res)))


  return (
    <main className={styles['tours-page']}>
       
        <div className = {`${styles['tours-page__content']} container`} >
            {/* <MainLogo /> */}
            <div className={styles["tours-page__title"]}>
                <h1>туры</h1>
                <h3>на Плато Путорана</h3>
            </div>
            <BigCards content = {tours}/>
        </div>
    </main>
  )
}

export default ToursPage