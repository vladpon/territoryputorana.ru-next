import styles from './projects.module.scss'
import BigCards from '../Components/BigCards/BigCards'

import { getProjects } from '../../lib/mongo/projects'

export const metadata = {
    title: 'Проекты',
    description: 'Экспедиции по плато Путорана и Таймыру до Карского моря. Снегоходная гонка. Экологический проект – сохранение первозданной природы Арктики.'
}

const ProjectsPage = async () => {
    const projects = await getProjects().then( res => JSON.parse(JSON.stringify(res)))

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