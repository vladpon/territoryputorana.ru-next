import TourPageCover from '../Components/TourPageCover/TourPageCover'
import MainLogo from '../Components/MainLogo/MainLogo'
import TextBlock from '../Components/TextBlock/TextBlock'

import { BACKGROUNDCOLORS, COLORS } from '../../constants/colors'

import styles from './arcticexpeditions.module.scss'

import TourPageAbout from '../Components/TourPageAbout/TourPageAbout'
import PhotoBlock from '../Components/PhotoBlock/PhotoBlock'




export const metadata = {
    title: 'Экспедиции Арктики',
    description: 'Экспедиции Арктики – разработка маршрутов экологического и познавательного туризма на плато Путорана. Объединенная дирекция заповедников Таймыра. Путоранский заповедник. Территория Путорана.'
}


const coverData = {
  title: 'Экспедиционный туризм',
  bigImg: './img/expeditions/expeditions_cover.jpg'
}

const ArcticExpeditions = () => {

  return (
    <main>
      <TourPageCover tour = {coverData}/>
      <TourPageAbout tour = {{
        about: ['Традиционно в весеннее время мы организуем снегоходную экспедицию на плато Путорана, подготовка к которой идёт целый год. Не больше двух путешественников могут стать полноценными членами профессиональной команды «Экспедиции Арктики».',
              'Экспедиция – это не про знакомство с достопримечательностями и обзорные экскурсии, это про достижение и преодоление, покорение арктических высот, разведку новых территорий.'
            ],
        aboutTitle: 'Вы можете стать участниками настоящей арктической экспедиции!',
        details: '<p><b>Продолжительность:</b> от 5 дней/ 6 ночей </p><p><b>Время проведения: </b>март-май</p><p><b>Группа: </b>не более 2-х путешественников в составе профессиональной команды экспедиции</p><p><b>Уровень: </b>необходимы хорошая физическая форма и опыт управления снегоходом</p><p><b>Стоимость: </b>от 550 000 руб/ участник</p>'
      }} />
      <MainLogo logoImg = './img/arcticLogo3.svg' backgroundColor = '#fff'/>
      <TextBlock 
          backgroundcolor = {COLORS.mainBlue}
          textColor = {COLORS.white}
          titleColor = {COLORS.white}
          title = ''
          titleAlign = 'center'
          text = {[
            'Вы войдете в число тех немногих людей, которым удалось побывать за Полярным кругом в зимнее время. Вместе мы будем пробивать дорогу по плато Путорана на снегоходах. Увидим грандиозные ледяные водопады, горные озера и ущелья. Заберемся на самую вершину, а затем отправимся на разведку вглубь плато к первозданной природе, незнакомой с человеком.',
            'Возможно, нам повезет встретить в пути целое стадо диких северных оленей, наблюдать своими глазами, как медведь охотится на лося, или как резвятся на горах молодые толстороги.'
          ]}
          textAlign = 'left'
          />
        <PhotoBlock photos = {[
          {path: './img/expeditions/glr/1.jpg'},
          {path: './img/expeditions/glr/2.jpg'},
          {path: './img/expeditions/glr/3.jpg'},
          {path: './img/expeditions/glr/4.jpg'},
          {path: './img/expeditions/glr/5.jpg'},
          {path: './img/expeditions/glr/6.jpg'}
        ]} />
        <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Базовый лагерь экспедиции'
            titleAlign = 'center'
            titleWeight = '500'
            text = {[
                'Усадьба «Жар. Птица» на озере Лама – более комфортных условий проживания в зимнее время на плато Путорана не существует. Уютный, большой и теплый дом с полноценными кроватями и свежим постельным бельем, ежедневная баня, вкусная еда с северным колоритом.'
            ]}
        />
         <PhotoBlock photos = {[
          {path: './img/expeditions/glr/7.jpg'},
          {path: './img/expeditions/glr/8.jpg'},
          {path: './img/expeditions/glr/9.jpg'},
          {path: './img/expeditions/glr/10.jpg'},
          {path: './img/expeditions/glr/11.jpg'},
          {path: './img/expeditions/glr/12.jpg'}
        ]} />
    </main>
  )
}

export default ArcticExpeditions