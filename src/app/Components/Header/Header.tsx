'use client'

import styles from './Header.module.scss'
import MENU from './menu.json'
import MainMenu from './MainMenu'
import BurgerMenu from './BurgerMenu'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'


const Header = () => {

  const [burgermenuActive, setBurgermenuActive] = useState(false)
  const [pageClass, setPageClass] = useState('')
  const pathname = usePathname()


  useEffect( () => 
    {
      const main = document.querySelector('main');
      const body = document.body;   
      const destructor = () => {
        main && main.removeEventListener('click', clickHandler)
      }
      const clickHandler = () => {
        setBurgermenuActive(false)
      }
      if(burgermenuActive) {
        body.classList.add('lock');
        setTimeout(() => main && main.addEventListener('click', clickHandler), 500);
      } else {
        body.classList.remove('lock');
      }
      return destructor
    }, [burgermenuActive])


   useEffect( () => {
      switch(pathname) {
        case '/':
          setPageClass('main-page')
          break
        case '/tours':
          setPageClass('other-page')
          break
        case '/jar3d':
          setPageClass('tour3d')
          break;
        case '/locations':
          setPageClass('tour3d')
          break;
        case '/tourpage':
          setPageClass('tour-page-class')
          break;
        case '/about':
          setPageClass('tour-page-class')
          break;
        case '/lostput':
          setPageClass('tour-page-class')
          break;
        case '/putoranatrails':
          setPageClass('tour-page-class')
          break;
        case '/weekend':
          setPageClass('tour-page-class')
          break;
        case '/camping':
          setPageClass('tour-page-class')
          break;
        case '/skitour':
          setPageClass('tour-page-class')
          break;
        case '/trailrunning':
          setPageClass('tour-page-class')
          break;
        case '/helicopter':
          setPageClass('tour-page-class')
          break;
        case '/jar':
          setPageClass('tour-page-class')
          break;
        case '/heliski':
          setPageClass('tour-page-class')
          break;
        case '/arctic':
          setPageClass('tour-page-class')
          break;
        case '/lostwaterfalls':
          setPageClass('tour-page-class')
          break;
        case '/helitour':
          setPageClass('tour-page-class')
          break;
        case '/skilama':
          setPageClass('tour-page-class')
          break;
        case '/sr':
          setPageClass('tour-page-class')
          break;
        case '/lamaproj':
          setPageClass('tour-page-class')
          break;
        case '/arcticexpeditions':
          setPageClass('tour-page-class')
          break;
        case '/tolstorog':
          setPageClass('tour-page-class')
          break;
        case '/zaton':
          setPageClass('tour-page-class')
          break;
        case '/expedition':
          setPageClass('tour-page-class')
          break;
        case '/photo':
          setPageClass('gallery-class')
          break;
        case '/helifishing':
          setPageClass('tour-page-class')
          break;
        case '/snowqueen':
          setPageClass('tour-page-class')
          break;
        case '/helipicnic':
          setPageClass('tour-page-class')
          break;
        case '/icedrift':
          setPageClass('tour-page-class')
          break;
        case '/grilling':
          setPageClass('tour-page-class')
          break;
        default:
          setPageClass('other-page')
      }
    }, [pathname])



  return (
    <header className = {classNames(styles.header, styles[pageClass])}>
      <div className={styles.header__body}>
        <div className = {`${styles.header__burger} ${burgermenuActive && styles.active} ${styles[pageClass]}`} onClick={ () => burgermenuActive ? setBurgermenuActive(false) : setBurgermenuActive(true) }><span></span></div>
        <MainMenu menu = {MENU} pageClass = {pageClass}/>
        <BurgerMenu menu = {MENU} active = {burgermenuActive} setActive = {setBurgermenuActive}/>
        <div className = {styles.header__contacts}>
          <a href="tel:+79039299383">+7 (903) 929-93-83</a>
          <div className = {styles.header__icons}>
              <a href="https://vk.cc/cmIUok"><img className = {styles.header__icon} src="https://territoryputorana.ru/img/vk_ico.png"></img></a>
              <a href="https://wa.me/79039299383"><img className = {styles.header__icon} src="https://territoryputorana.ru/img/wa_ico.png"></img></a>
              <a href="https://t.me/territoryputorana"><img className = {styles.header__icon} src="https://territoryputorana.ru/img/tlgrm_ico.png"></img></a>
          </div>
        </div> 
        <div className = {styles.header__home}>
            <Link href = '/' onClick={() => setBurgermenuActive(false)}>
                <img src='https://territoryputorana.ru/img/home.png'></img>
            </Link>
        </div>
      </div>
    </header>
  )
}


export default Header