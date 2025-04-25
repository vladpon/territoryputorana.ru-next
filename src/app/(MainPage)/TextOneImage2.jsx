import React from 'react'
import styles from './TextOneImage2.module.scss'

const TextOneImage2 = () => {
  return (
    <div className={styles['bg-container']}>
        <div className = {`${styles["txt-oimg2"]} container`}>
            <div className = {styles["txt-oimg2__title"]}>
                <h2>Чисто Лама</h2>
                <h3>Экологический проект</h3>
            </div>
            <div className={styles["txt-oimg2__content"]}>
                <p>Победитель Президентского гранта 2023 в направлении «Охрана окружающей среды и защита животных».
                    Мы сформировали команду из увлеченных своим делом активистов «Территории Путорана», специалистов заповедника, волонтеров для уборки и вывоза мусора с заповедной зоны. Грантовая поддержка и привлечение спонсоров позволяет нам обеспечивать команду проекта необходимой техникой и материалами.
                    </p>
                <div className={styles["txt-oimg2__img"]}>
                    <img src="./img/mp_lama.jpg" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TextOneImage2