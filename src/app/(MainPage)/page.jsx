import Cover from "./Cover";
import TextWord from "./TextWord"
import CardsBlock from './CardsBlock'
import TextOneImage from './TextOneImage'
import VideoBlock from './VideoBlock'
import RequestBlock from '../Components/RequestBlock/RequestBlock'
import styles from './MainPage.module.scss'
import { getTours } from "@/lib/mongo/tours";
import TextFewImages from './TextFewImages'



const textWord = {
  text: 'Плато Путорана — одно из самых удивительных мест России и объект Всемирного наследия ЮНЕСКО. Край бездонных каньонов, уникальных гор без вершин и тысячи озер. Здесь бурные реки, срываясь со скал, образуют высочайшие в России водопады. Здесь нет дорог, и не ходят поезда. Побывать в этих труднодоступных местах посчастливилось совсем небольшому числу людей. Но чем сложнее добраться, тем сильнее восторг от покорения!',
  word: 'путорана'
}


const textOneImage = {
  title_h2: 'Территория Путорана',
  title_h3: 'Покори Север с нами!',
  text: [
    'Более 10 лет мы занимаемся организацией туров и экспедиций на плато Путорана и знаем, чем удивить самого искушенного путешественника.',
    'Самые известные достопримечательности и места, где практически не ступала нога человека, мощный трекинг для выносливых и полёты на вертолётах, северная гастрономия от шеф-повара и гриль-пикники у водопадов — мы устроим для вас настоящее приключение в дикой природе с максимальным комфортом и эксклюзивным сервисом.',
    'Мы работаем с корпоративными и частными группами, организуем персональные туры с индивидуальной программой, гастрономические и ивент-туры.',
    'Можете быть уверены, что путешествие в затерянный мир плато Путорана вместе с нами подарит вам самые яркие эмоции и запомнится надолго.',
    'Антон Лысов',
    'Основатель и руководитель компании «Территория Путорана»'
  ],
  img: "./img/anton2.jpg"
}

const textFewImages = {
  photo: [
    './img/exped1.jpg',
    './img/exped2.jpg',
    './img/exped3.jpg',
    './img/exped4.jpg'
  ],
  title_h2: 'Экспедиции Арктики',
  title_h3: '',
  text: 'Вы можете стать участниками настоящей арктической экспедиции. Вместе с профессиональной командой на снегоходах вы отправитесь на разведку вглубь плато Путорана к первозданной природе, незнакомой с человеком.'
}

export default async function Home() {
  const data = await getTours().then( res => JSON.parse(JSON.stringify(res)))
  const tours = ('error' in data) ? null : data

  return (
    <main className={styles['main-page']}>
      <Cover />
      <TextWord text = {textWord.text} word = {textWord.word}/>
      <CardsBlock tours = {tours} />
      <TextOneImage textOneImage = {textOneImage} />
      <VideoBlock src = './img/putorana.m4v#t=0.001' h2Text = 'Покори Север с нами!'/>
      <TextFewImages textFewImages = {textFewImages} />
      <RequestBlock bgImage = {'/img/main_req.jpg'}  h2Text = {'Есть вопросы?'} h3Text = {"Оставьте заявку и мы обязательно свяжемся с вами!"} />
   </main>
  );
}