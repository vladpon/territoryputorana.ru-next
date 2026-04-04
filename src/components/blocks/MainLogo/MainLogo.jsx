import React from 'react'
import styles from './MainLogo.module.scss'
import Link from 'next/link'

const MainLogo = (props) => {
  const {logoImg, backgroundColor} = props
  return (
    <div className={styles["main-logo"]} style = {backgroundColor ? {backgroundColor: backgroundColor, backgroundImage: 'none'} : {backgroundColor: 'none'}}>
        <Link href = "/"><img src={ logoImg ? logoImg : "https://territoryputorana.ru/img/main_logo.svg"} alt="logo" /></Link>
    </div>
  )
}

export default MainLogo