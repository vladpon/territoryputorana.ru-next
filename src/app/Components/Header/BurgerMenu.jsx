import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'


const BurgerMenu = (props) => {
    const { menu, active, setActive } = props

    const burgermenuPosition = active ? { left: '0'} : { left: '-100%' }

  return (
    <div className = {styles['burger-menu']} style = {burgermenuPosition}>
      <ul>
        {menu.map( (menuItem) => <li key={menuItem.id} >
                                  <Link href = { menuItem.href } onClick={() => setActive(false)}>{ menuItem.title } </Link>
                                  {menuItem.items && (<ul>{menuItem.items.map( (subMenuItem) => <li key = {subMenuItem.id}><Link href = {subMenuItem.href} onClick={() => setActive(false)}>{subMenuItem.title}</Link></li>)}</ul>)}
                              </li>
            )}
      </ul>
    </div>
  )
}

export default BurgerMenu