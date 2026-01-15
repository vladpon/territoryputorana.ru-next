import Cover from "./Cover";
import TextWord from "./TextWord"
import CardsBlock from './CardsBlock'
import TextOneImage from './TextOneImage'
import VideoBlock from './VideoBlock'
import RequestBlock from '../Components/RequestBlock/RequestBlock'
import styles from './MainPage.module.scss'
import { getTours, getMainPageTours } from "@/lib/mongo/tours";
import TextFewImages from './TextFewImages'



const textWord = {
  text: 'Плато Путорана — одно из самых удивительных мест России и объект Всемирного наследия ЮНЕСКО. Край бездонных каньонов, уникальных гор без вершин и тысячи озер. Здесь бурные реки, срываясь со скал, образуют высочайшие в России водопады. Здесь нет дорог, и не ходят поезда. Побывать в этих труднодоступных местах посчастливилось совсем небольшому числу людей. Но чем сложнее добраться, тем сильнее восторг от покорения!',
  word: 'путорана'
}


const textOneImage = {
  title_h2: 'Территория Путорана',
  title_h3: 'Покори Север с нами!',
  text: [
    'Мы занимаемся организацией туров и экспедиций на плато Путорана уже больше 10 лет и знаем, чем удивить самого искушенного путешественника.',
    'Программы наших туров построены так, чтобы за отведённое время, показать Вам самое лучше, необычное и впечатляющее. Знаменитые открыточные виды и тайные уголки, известные только нашим гидам, полёты на вертолётах и аутентичная северная кухня.',
    'Здесь, в дикой первозданной природе, мы позаботимся о Вашем максимальном удобстве и комфорте.',
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
  const data = await getMainPageTours().then( res => JSON.parse(JSON.stringify(res)))
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