import styles from './ThankYou.module.scss'
import MainLogo from '../Components/MainLogo/MainLogo'
import Link from 'next/link'

const ThankYou = () => {
  return (
    <div className={styles['thankyou-page']}>
        <MainLogo />
        <>
            <h3>Ваша заявка успешно отправлена.</h3>
            <h3>Мы свяжемся с Вами в самое ближайшее время.</h3>
            <h3><Link href = '/'>На главную</Link></h3>
        </>
    </div>
  )
}

export default ThankYou