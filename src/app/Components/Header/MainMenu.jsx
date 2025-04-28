'use client'

import Link from 'next/link'
import React from 'react'

import styles from './Header.module.scss'
import { usePathname } from 'next/navigation'



const MainMenu = (props) => {
  
  const {menu, pageClass} = props
  const pathname = usePathname();

  const renderSubMenu = (items) => {
    const subMenu = items.map((subMenuItem) => 
      <li className = {styles['sub-menu__link']} key = {subMenuItem.id}>
        <Link href = {subMenuItem.href}>{subMenuItem.title}</Link>
      </li>
    )
    return (
      <ul className ={`${styles['menu__sub-menu']} ${styles['sub-menu']}`}>
        {subMenu}
      </ul>
    )
  }

  
  return (
    <nav className={`${styles.header__menu} ${styles.menu}`}>
        <ul className={styles.menu__list}>
          {menu.map((menuItem) =>
            <li key = {menuItem.id}>
              <Link href =  {menuItem.href} className = {`${styles.menu__link} ${pathname == menuItem.href && styles['active']} ${styles[pageClass]}`}>{menuItem.title}</Link>
              {menuItem.items && renderSubMenu(menuItem.items)}
            </li>
            )
          }
        </ul>
      </nav>
  )
}

export default MainMenu