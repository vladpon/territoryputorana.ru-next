import MainLogo from "../Components/MainLogo/MainLogo"
import TourPageCover from "../Components/TourPageCover/TourPageCover"
import PhotoBlock from "../Components/PhotoBlock/PhotoBlock"
import RequestBlock from '../Components/RequestBlock/RequestBlock'

import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';

import styles from './lamaproj.module.scss'

const plugins = [presetReact()];

const lamaProjectData = {
    cover: {
        title: 'Экологический проект «Чисто Лама»',
        bigImg: "./img/lama_cover03.jpg"
      },
    photos: [
    { path: "./img/lama_ph_001.jpg"},
    { path: "./img/lama_ph_002.jpg"},
    { path: "./img/lama_ph_003.jpg"},
    { path: "./img/lama_ph_004.jpg"},
    { path: "./img/lamaproj010.jpg"},
    { path: "./img/lama_ph_006.jpg"}
    ],
    about: '[p]«Чисто Лама» - экологический проект АНО «Центр развития туризма «Территория Путорана» стал победителем Президентского гранта 2023 в направлении «Охрана окружающей среды и защита животных».[/p][p]Наши цели:[/p][list][*]сохранить уникальный Путоранский заповедник и территорию озера Лама в первозданной чистоте,[*]снизить неблагоприятное воздействие человека на заповедную природу,[*]продвигать культуру ответственного познавательного и экологического туризма.[/list]',
    team: 'Мы сформировали команду из увлеченных своим делом активистов «Территории Путорана», специалистов заповедника, волонтеров для уборки и вывоза мусора с заповедной зоны. Грантовая поддержка и привлечение спонсоров позволяет нам обеспечивать команду проекта необходимой техникой и материалами',
    summer23report: [
        {
          description: 
            [
              "В июле, первым делом как позволила погода, мы вывезли мусор, собранный нашей командой волонтеров и неравнодушными соседями-туристами. Мусора набралась целая баржа. И это не может не беспокоить. К сожалению, не все туристы, отдыхающие на плато Путорана понимают значимость элементарных норм для сохранения уникальной природы в первозданной чистоте и красоте."
            ],
          img: "/img/KobGtE9R4no.jpg"
        },
        {
          description: 
            [
              "Во время работ по вывозу мусора, мы с волонтерами обнаружили на охраняемом озере Лама бесхозные браконьерские сети. И их было немало. Только представьте какой вред они уже успели нанести ихтиофауне озера! Все сети были сняты и доставлены в Объединенную дирекцию заповедников Таймыра, которая являются партнером грантового проекта «Чисто Лама», для принятия последующих решений."
            ],
          img: "/img/FWOQHjBjQQQ.jpg"
        },
        {
          description:
            [
              "Иногда природе нужна помощь не только для того, чтобы избавляться от следов пребывания человека, но и для того, чтобы подправить вред, который разными процессами и явлениями природа может принести сама себе. С 2023 года волонтеры проекта «Чисто Лама» ведут важнейшую и очень тяжелую работу по расчистке природной захламленности русел горных рек.",
              "Каждую весну при таянии снега, с мощными подвижками льда горные реки ломают деревья, тащат их по течению. В узких и неглубоких местах, на изгибах рек, сломанные деревья зацепляются, их становится больше и больше. Постепенно в этих местах формируются естественные заторы, которые становятся преградами для беспрепятственного прохода воды из рек в озеро. Как следствие, начинается разлив реки, на которой образовался забор, происходит заболачивание местности, загнивание живых деревьев.",
              "При подаче проекта «Чисто Лама» на конкурс Фонда Президентских грантов, мы уделили отдельное внимание работам по расчистке природных завалов на реках. Дирекция Заповедников Таймыра поддержала наше начинание."
            ],
          img: "/img/SmWC-0B-Jt0.jpg"
        }
      ]
}


export const metadata = {
    title: 'Экологический проект',
    description: '«Чисто Лама» - экологический проект АНО «Центр развития туризма «Территория Путорана». Президентский грант 2023 в направлении «Охрана окружающей среды и защита животных». Путоранский заповедник. Волонтеры.'
}

const LamaProj = () => {


  return (
    <main className = 'lama-proj'>
      <MainLogo />
      <TourPageCover tour = {lamaProjectData.cover} />

      <div className = {styles.about}>
        <div className = {`${styles.about__content} container`}>
            <div className = {styles.about__text}><BBCode plugins={plugins}>{lamaProjectData.about}</BBCode></div>
        </div>
      </div>

      <div className = {styles.team}>
        <div className = {`${styles.team__content} container`}>
            <div className = {styles.team__text}><BBCode plugins={plugins}>{lamaProjectData.team}</BBCode></div>
        </div>
      </div>

        <article className = {styles.article}>
            <div className = {`${styles.article__content} container`}>
                <h2>Краткий отчет по проекту</h2>
                <div className = {styles.article__itemscontainer}>
                    {lamaProjectData.summer23report.map((item, index) => 
                                <div className = {styles.article__item} key={index}>
                                    <div className = {styles.article__text}><p>{item.description}</p></div>
                                    <div className = {styles.article__img}><img src={item.img}></img></div>
                                </div>)}
                </div>
            </div>
          
        </article>
      {/* <PhotoBlock photos = {lamaProjectData.photos}/> */}
      <RequestBlock bgImage = {'./img/lamaproj/lamaproj_req.jpg'} h2Text = {"Стать волонтером или партнером"} h3Text = {"Оставьте заявку и мы обязательно Вам ответим"}/>

    </main>
  )
}

export default LamaProj