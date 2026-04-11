import React from 'react'
import styles from './ArcticLogo.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const ArcticLogo = (props) => {
  return (
    <div className={styles["logo"]}>
        <Link href = "/">
          <Image 
            src={ "/img/arcticLogo.png"} 
            alt="logo"
            width={220}
            height={159} 
          />
        </Link>
    </div>
  )
}

export default ArcticLogo