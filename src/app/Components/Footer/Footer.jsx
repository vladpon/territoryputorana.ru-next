import React from 'react'
// import { Link } from 'react-router-dom'
import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles['footer__logo-container']}>
            <Link href = '/' className = {styles['footer__logo']}>
                <img src='https://territoryputorana.ru/img/main_logo.svg'></img>
            </Link>
            <Link href = '/arcticexpeditions' className = {styles['footer__logo']}>
                <img src='https://territoryputorana.ru/img/arctic_logo.svg'></img>
            </Link>
            <Link href = '/sr' className = {styles['footer__logo']}>
                <img src='https://territoryputorana.ru/img/sr_logo.svg'></img>
            </Link>
        </div>
        <div className={styles['footer__contacts']}>
            <span>Связаться с нами</span>
            <a href="tel:+79039299383"><span>+7 (903) 929-93-83</span></a>
            <div className={styles["footer__icons"]}>
                <a href="https://vk.cc/cmIUok"><img className={styles["footer__icon"]} src="https://territoryputorana.ru/img/vk_ico.png"></img></a>
                <a href="https://wa.me/79039299383"><img className={styles["footer__icon"]} src="https://territoryputorana.ru/img/wa_ico.png"></img></a>
                <a href="https://t.me/territoryputorana"><img className={styles["footer__icon"]} src="https://territoryputorana.ru/img/tlgrm_ico.png"></img></a>
            </div>
            <div className={styles['footer__privacy']}>
                {/* <a href = '/privacy'>Политика конфиденциальности</a> */}
                <span>РТО 025757</span>
                <span>Номер реестровой записи:<br /> <a href = 'https://tourism.fsa.gov.ru/ru/resorts/hotels/1e21e3e6-c608-11ef-92da-4b92d2b683f7/about-resort'>С242024002449</a></span>
            </div>
        </div>
    </footer>
  )
}

export default Footer