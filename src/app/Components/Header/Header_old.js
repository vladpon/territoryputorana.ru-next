'use client';

import styles from './Header.module.scss'

import React, { useEffect } from 'react'
import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom'

import Link from 'next/link'


import MENU from './menu.json'



const Header = (props) => {
  const { headerBackgroundColor, headerLinkColor } = props
  const [menuActive, setMenuActive] = useState(false)
  // const location = useLocation();
  const [pageClass, setPageClass] = useState('')


  const renderMainMenu  = (MENU) => {
  
    const renderSubMenu = (items) => {
      const subMenu = items.map((subMenuItem) => 
        <li className = {styles.sub-menu__link} key = {subMenuItem.id}>
          {/* <Link to = {subMenuItem.href}>{subMenuItem.title}</Link> */}
        </li>
      )
      return (
        <ul className ="menu__sub-menu sub-menu">
          {subMenu}
        </ul>
      )
    }
    return (
      <nav className='header__menu menu'>
        <ul className='menu__list'>
          {MENU.map((menuItem) =>             
            <li key = {menuItem.id}>
              <Link to = {menuItem.href} className = {`menu__link ${pageClass}`}>{menuItem.title}</Link>
              {menuItem.items && renderSubMenu(menuItem.items)}
            </li>
            )
          }
        </ul>
      </nav>
  )}
  
  
  const renderBurgerMenu = (MENU) => {
    return (
      <div className='burger-menu' >
        <ul>
        {MENU.map( (menuItem) => <li key={menuItem.id} >
                                      {/* <Link to = { menuItem.href } onClick={() => setMenuActive(false)}>{ menuItem.title } </Link> */}
                                      {/* {menuItem.items && (<ul>{menuItem.items.map( (subMenuItem) => <li key = {subMenuItem.id}><Link to = {subMenuItem.href} onClick={() => setMenuActive(false)}>{subMenuItem.title}</Link></li>)}</ul>)} */}
                                    </li> 
                                )}                
        </ul>
      </div>
    )
  }

  
 

  useEffect( () => 
  {    
    const burger = document.querySelector('.header__burger');
    const burgerMenu = document.querySelector('.burger-menu');
    const main = document.querySelector('main');
    const body = document.body;    

    const destructor = () => {
      main && main.removeEventListener('click', clickHandler)
    }

    const clickHandler = () => {
      setMenuActive(false)
    }

    if(menuActive) {
      burgerMenu.classList.add('active');
      body.classList.add('lock');
      burger.classList.add('active');
      setTimeout(() => main && main.addEventListener('click', clickHandler), 500);
    } else {
      burgerMenu.classList.remove('active');
      body.classList.remove('lock');
      burger.classList.remove('active');
    }
    return destructor
    
  }, [menuActive])

  useEffect( () => {
    switch(location.pathname) {
      case '/':
        setPageClass('main-page')
        break
      case '/Lama3d':
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
      default:
        setPageClass('other-page')
    }  
  }, [location])


  return (    
    <header className = {`header ${pageClass}`}>
      <div className='header__body'>

        
        <div className = {`header__burger ${pageClass}`} onClick={ () => menuActive ? setMenuActive(false) : setMenuActive(true) }>
          <span></span>
        </div>
        
        { renderMainMenu(MENU) }
        { renderBurgerMenu(MENU) }
        <div className = {`header__contacts ${pageClass}`}>
          <a href="tel:+79039299383">+7 (903) 929-93-83</a>
          <div className = "header__icons">
              <a href="https://vk.cc/cmIUok"><img className = "header__icon" src="https://territoryputorana.ru/img/vk_ico.png"></img></a>
              <a href="https://wa.me/79039299383"><img className = "header__icon" src="https://territoryputorana.ru/img/wa_ico.png"></img></a>
              <a href="https://t.me/territoryputorana"><img className = "header__icon" src="https://territoryputorana.ru/img/tlgrm_ico.png"></img></a>
          </div>                  
        </div> 
        <div className = {`header__home ${pageClass}`}>
          <Link to = '/' onClick={() => setMenuActive(false)}>
              <img src='https://territoryputorana.ru/img/home.png'></img>
          </Link>
        </div>       
      </div>
    </header>
  )
}

export default Header