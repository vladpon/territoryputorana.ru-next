import MainLogo from "../Components/MainLogo/MainLogo"
import PhotoBlock from "../Components/PhotoBlock/PhotoBlock"
import RequestBlock from "../Components/RequestBlock/RequestBlock"
import TourPageCover from "../Components/TourPageCover/TourPageCover"

import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';

import styles from './sr.module.scss'

const snowRide = {
  title: "Снегоходная гонка за полярным кругом",
  bigImg: "./img/sr_cover001.jpg"
}

const plugins = [presetReact()];

const srData = {
  main: {
    text: '[p]С 2022 года каждую весну «Территория Путорана» совместно «Лама-Тур» проводят ежегодную снегоходную гонку и фестиваль зимних активностей «SNOW RIDE Putorana».[/p][p][b]Дата проведения в 2025 году:[/b] 26 апреля [br][b]Место проведения:[/b] лайда в районе ущелья «Красные камни»[br][b]Место сбора участников и гостей: [/b] район Талнах, нижняя дорога на «Красные камни»[/p][p]В программе фестиваля: захватывающая гонка на снегоходах, выставка высокопроходимой техники, весёлый ведущий с музыкой и конкурсами для зрителей, сноутюбинг, а также дополнительная трасса для гонщиков помладше и просто желающих прокатиться на снегоходе. Для самых маленьких «гонщиков» мы организуем катание в упряжке на ездовых собаках, а также катание на надувном банане за снегоходом.[/p][p]Соревновательная программа разбита на категории, в каждой три призовых места:[/p][list=disc][*]утилитарный снегоход,[*]горный снегоход,[*]сноубайк.[/list][p]Итого девять победителей - лучших снегоходчиков Норильска![/p]',
    img: './img/sr_001a.jpg'
  },
  bid: {
    text: 'Для участия в гонке Вам необходимо отправить заявку на электронную почту [url=mailto:snowrideputorana@yandex.ru]snowrideputorana@yandex.ru[/url][br]Заявка включает 4 документа:[br][list=disc][*][url=zayavka.docx]Заявка[/url] на участие в фестивале SNOW RIDE PUTORANA 2025[*][url=soglasie.docx]Согласие[/url] на обработку персональных данных[*]Действующий страховой полис (скан-копия или фото)[*]Скан-копия или фото разворота паспорта с основными данными[/list]Заявки принимаются до 15 апреля[br]Задать вопросы и уточнить детали можно [url=https://wa.me/79954404149]+7 995 440 41 49[/url]',
    test: '[list][*]а участие в фестивале SNOW RIDE PUTORANA 2025[*]на обработку персональных данных[*]Действующий страховой полис (скан-копия или фото)[*]Скан-копия или фото разворота паспорта с основными данными[/list]'
  },
  requirements: {
    title: 'Основные требования к участникам:',
    text: '[list=disc][*]К соревнованиям допускаются снегоходы производства любых стран и марок[*]Участник обязан иметь при себе оригинал действующего страхового полиса (застраховаться можно в офисе АльфаСтрахование по адресу: Ленинский пр-т, д. 7, вид спорта: снегоходный спорт, страховой полис должен быть действителен на 01.04.2023 или полис РЕСО)[*]Участник обязан иметь минимальный набор средств защиты - шлем, очки, перчатки[*]Участник должен не младше 18 лет[*]Участник должен уплатить стартовый взнос в размере 1500 рублей и зарегистрироваться на мероприятие, подав заявку[/list]'
  },
  thesis: {
    text: '[p]Скачать и ознакомиться с положением о любительских соревнованиях по снегоходному Кросс-Кантри можно по [url=polojenie.docx]ссылке.[/url][/p]'
  },
  photos: [
    { path: "./img/sr_ph001.jpg", alt: ""},
    { path: "./img/sr_ph003.jpg", alt: ""},
    { path: "./img/sr_ph004.jpg", alt: ""},
    { path: "./img/sr_010.jpg", alt: ""},
    { path: "./img/sr_ph006.jpg", alt: ""},
    { path: "./img/sr_011.jpg", alt: ""}
  ],
  partners: {
    text: '[list][*]грантовая программа Норникеля «Мир Новых возможностей»[*]группа компаний «Жар. Птица»[*]группа компаний «Арктур»[*]магазин «Экстрим»[*]транспортная компания «РусТрансЭкспресс»[*]компания «СибТех»[*]магазин «Авто-дело»[*]компания «Питкофф»[*]BURGER RING[*]развлекательный центр «Арена игр»[*]магазин «YOKOHAMA»[*]магазин «Спортландия»[*]рекламно-производственная компания «Планета Голливуд»[/list]',
    img: './img/sr_partners.jpg'
  }
}


export const metadata = {
    title: 'Snow Ride',
    description: 'Ежегодная снегоходная гонка и фестиваль зимних активностей «SNOW RIDE Putorana». Норильск, ущелье Красные камни.'
}
const SnowRide = () => {


  return (
    <main>
      <MainLogo logoImg = './img/sr_logo2024.svg' backgroundColor = '#fff'/>
      <TourPageCover tour = {snowRide} />
       <div className = {styles.main}>
          <div className = {`${styles.main__content} container`} style={{margin: '0 auto'}}>
            <div className={styles.text}>
              <BBCode plugins={plugins}>{srData.main.text}</BBCode>            
            </div>
            <div className={styles.img}>
              <img src={srData.main.img}></img>
            </div>
          </div>
      </div>

      <div className = {styles.bid}>
        <div className = {`${styles.bid__content} container`}>
          <BBCode plugins={plugins}>{srData.bid.text}</BBCode>
        </div>
      </div>

      <div className = {styles.requirements}>
        <div className = {`${styles.requirements__content} container`}>
          <h2><BBCode plugins={plugins}>{srData.requirements.title}</BBCode></h2>
          <div className = {styles.requirements__text}><BBCode plugins={plugins}>{srData.requirements.text}</BBCode></div>
        </div>
      </div>

      <div className = {styles.thesis}>
        <div className = {`${styles.thesis__content} container`}>
          <BBCode plugins={plugins}>{srData.thesis.text}</BBCode>
        </div>
      </div>

      <div className = {styles.partners}>
        <div className = {`${styles.partners__content} container`}>
          <div className = {styles.partners__text}><BBCode plugins={plugins}>{srData.partners.text}</BBCode></div>
          <div className = {styles.partners__img}><img src = {srData.partners.img}></img></div>
        </div>
      </div>

      <PhotoBlock photos = {srData.photos}/>

      <RequestBlock bgImage = {'./img/sr_req.jpg'} h2Text = {"Стать участником или партнером"} h3Text = {"Оставьте заявку и мы обязательно Вам ответим"}/>
      
    </main>
  )
}

export default SnowRide