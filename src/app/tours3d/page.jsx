import MainLogo from '../Components/MainLogo/MainLogo'
import BigCards from '../Components/BigCards/BigCards'

import styles from './tours3d.module.scss'

const tours3d = [
    {
        "id": "001",
        "title": "Усадьба Жар. Птица",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/jar_small.jpg",
        "optImg": "",
        "description": [],
        "tourPhoto": [],
        "contacts": {},
        "files": [],
        "href": "/jar3d"
    },
    {
        "id": "003",
        "title": "Наши локации",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/lama_lake.jpg",
        "optImg": "",
        "description": [],
        "tourPhoto": [],
        "contacts": {},
        "files": [],
        "href": "/locations"
    }
]

export const metadata = { 
    title: '3d туры',
    description: 'Приглашаем на виртуальную прогулку по плато Путорана. Усадьба «Жар. Птица» и палаточный кемпинг на озере Лама. Природные локации, которые вы сможете посетить во время тура.'
}

const Tours3d = () => {

  return (
    <main className = {styles['tours3d-page']}>
        <div className = {`${styles['tours3d-page__content']} container`}>
            <MainLogo />
            <div className = {styles["tours3d-page__title"]}>
                <h1>3D Туры</h1>
                <h3>Территории Путорана</h3>
            </div>
            <BigCards content = {tours3d}/>
        </div>
    </main>
  )
}

export default Tours3d