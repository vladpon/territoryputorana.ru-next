import classNames from 'classnames/bind'
import styles from './aboutPartners.module.scss'

const AboutPartners = () => {
  return (
    <div className={classNames(styles.about_partners)}>
        
            <div className={classNames(styles.content, 'container')}>
                <div className={styles.text}>
                    <p>Мы сотрудничаем с крупнейшими компаниями России. Будем рады организовать особенное путешествие для Вас!</p>
                </div>
                <div className={styles.logos}>
                    <img src='/img/logo/1.png'></img>
                    <img src='/img/logo/2.png'></img>
                    <img src='/img/logo/3.png'></img>
                    <img src='/img/logo/4.png'></img>
                    <img src='/img/logo/5.png'></img>
                    <img src='/img/logo/6.png'></img>
                    <img src='/img/logo/7.png'></img>
                    <img src='/img/logo/8.png'></img>
                    <img src='/img/logo/9.png'></img>
                </div>
            </div>
    </div>
  )
}

export default AboutPartners