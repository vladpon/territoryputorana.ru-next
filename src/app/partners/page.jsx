import styles from './partners.module.scss'
import BigCards from '../Components/BigCards/BigCards'
import { getPartners } from '@/lib/mongo/partners'



export const metadata = {
    title: 'Партнеры',
    description: 'В этом разделе представлены туры, экскурсии и гостиницы Норильска. Туры на плато Путорана. Джип-туры. Однодневные экскурсии. Спортивно-туристические походы. Гостиницы, базы отдыха.'
}

const sections = [
    'Туры и походы' ,"Гостиницы"
]

const Partners = async () => {
    const partners = await getPartners().then( res => JSON.parse(JSON.stringify(res)))
    
  return (
    <main className={styles['partners-page']}>
        <div className = {`${styles['partners-page__content']} container`}>
            <div className={styles["partners-page__title"]}>
                <h1>Партнеры</h1>
                <h3>Территории Путорана</h3>
            </div>
            <BigCards 
                content = {partners} 
                imgFitContain = {true}
                sections = {sections}
                />
        </div>
    </main>
  )
}

export default Partners