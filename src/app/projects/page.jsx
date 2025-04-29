import styles from './projects.module.scss'
import BigCards from '../Components/BigCards/BigCards'

// import { fetchProjects } from '../../api/fetchProjects'

const projects = [
    {
        "id": "001",
        "title": "SNOW RIDE PUTORANА",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/sr_cover.jpg",
        "optImg": "",
        "description": [
            "Когда везде зимний сезон заканчивается, у нас в Заполярье он только начинается! С 2022 года в марте-апреле «Территория Путорана» совместно с «Лама тур» организует снегоходную гонку в предгорье знаменитого ущелья Красные камни."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "",
            "email": "",
            "site": ""
        },
        "files" : [],
        "href" : "/sr"
    },
    {
        "id": "002",
        "title": "ЧИСТО ЛАМА",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/lama_cover.jpg",
        "optImg": "",
        "description": [
            "Победитель Президентского гранта 2023 в направлении «Охрана окружающей среды и защита животных». Мы сформировали команду из увлеченных своим делом активистов «Территории Путорана», специалистов заповедника, волонтеров для уборки и вывоза мусора с заповедной зоны. Грантовая поддержка и привлечение спонсоров позволяет нам обеспечивать команду проекта необходимой техникой и материалами."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "",
            "email": "",
            "site": ""
        },
        "files" : [],
        "href" : "/lamaproj"
    },
    {
        "id": "003",
        "title": "Экспедиции Арктики",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/ae.jpg",
        "optImg": "",
        "description": [
            "Исследовательский проект, целью которого является разработка маршрутов экологического, краеведческого и познавательного туризма на  плато Путорана."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "",
            "email": "",
            "site": ""
        },
        "files" : [],
        "href" : "/arcticexpeditions"
    }
]

export const metadata = {
    title: 'Проекты',
    description: 'Экспедиции по плато Путорана и Таймыру до Карского моря. Снегоходная гонка. Экологический проект – сохранение первозданной природы Арктики.'
}

const ProjectsPage = async () => {
    // const projects = await fetchProjects()
  return (
    <main className={styles['projects-page']}>
        <div className = {`${styles['projects-page__content']} container`}>
            <div className={styles["projects-page__title"]}>
                <h1>Проекты</h1>
                <h3>Территории Путорана</h3>
            </div>
            <BigCards content = {projects}/>
        </div>
    </main>
  )
}

export default ProjectsPage