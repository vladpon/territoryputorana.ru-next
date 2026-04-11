import TourPageCover from '@/components/tour/TourPageCover/TourPageCover'
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import TourPageAbout from '@/components/tour/TourPageAbout/TourPageAbout'
import GallerySlider from "@/components/ui/PhotoSlider/PhotoSlider";
import ArcticLogo from './ArcticLogo'


import { BACKGROUNDCOLORS, COLORS } from '@/constants/colors'



import PhotoBlock from '@/components/blocks/PhotoBlock/PhotoBlock'
import Section from '@/components/layout/Section/Section'
import AccordionCard from '@/components/ui/AccordionCard/AccordionCard'

import styles from './arcticexpeditions.module.scss'




export const metadata = {
    title: 'Экспедиции Арктики',
    description: 'Экспедиции Арктики – разработка маршрутов экологического и познавательного туризма на плато Путорана. Объединенная дирекция заповедников Таймыра. Путоранский заповедник. Территория Путорана.'
}


const coverData = {
  title: '',
  bigImg: './img/expeditions/expeditions_cover.jpg'
}

const ArcticExpeditions = () => {

  return (
    <main>
      <TourPageCover tour = {coverData}>
        <ArcticLogo />
      </TourPageCover>
      <TourPageAbout tour = {{
        about: ['Вы можете стать участниками настоящей арктической экспедиции.',
              'Традиционно в весеннее время мы организуем снегоходную экспедицию на плато Путорана, подготовка к которой идёт целый год. Не больше двух путешественников могут стать полноценными членами профессиональной команды «Экспедиции Арктики».',
              'Экспедиция – это не про знакомство с достопримечательностями и обзорные экскурсии, это про достижение и преодоление, покорение арктических высот, разведку новых территорий.'
            ],
         info: {
              "version": 1,
              "title": "",
              "blocks": [
                {
                  "type": "fact",
                  "key": "time",
                  "label": "Продложительность",
                  "value": [
                    {
                      "type": "text",
                      "text": "от 5 дней/ 6 ночей"
                    }
                  ]
                },
                {
                  "type": "fact",
                  "key": "period",
                  "label": "Время проведения",
                  "value": [
                    {
                      "type": "text",
                      "text": "март-май"
                    }
                  ]
                },
                {
                  "type": "fact",
                  "key": "groupSize",
                  "label": "Группа",
                  "value": [
                    {
                      "type": "text",
                      "text": "не более 2-х путешественников в составе профессиональной команды экспедиции"
                    }
                  ]
                },
                {
                  "type": "fact",
                  "key": "uroven",
                  "label": "Уровень",
                  "value": [
                    {
                      "type": "text",
                      "text": "необходимы хорошая физическая форма и опыт управления снегоходом"
                    }
                  ]
                },
                {
                  "type": "fact",
                  "key": "price",
                  "label": "Стоимость",
                  "value": [
                    {
                      "type": "text",
                      "text": "от 550 000 ₽/ участник"
                    }
                  ]
                }
              ]
            },
        aboutTitle: 'Об экспедиции',
        details: '<p><b>Продолжительность:</b> от 5 дней/ 6 ночей </p><p><b>Время проведения: </b>март-май</p><p><b>Группа: </b>не более 2-х путешественников в составе профессиональной команды экспедиции</p><p><b>Уровень: </b>необходимы хорошая физическая форма и опыт управления снегоходом</p><p><b>Стоимость: </b>от 550 000 руб/ участник</p>'
      }} />
      <TextBlock 
          backgroundcolor = {BACKGROUNDCOLORS.primary} 
          titleColor = {COLORS.black} 
          textColor = {COLORS.black}
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
        ]} />
        {/* <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Базовый лагерь экспедиции'
            titleAlign = 'center'
            titleWeight = '500'
            text = {[
                'Усадьба «Жар. Птица» на озере Лама – более комфортных условий проживания в зимнее время на плато Путорана не существует. Уютный, большой и теплый дом с полноценными кроватями и свежим постельным бельем, ежедневная баня, вкусная еда с северным колоритом.'
            ]}
        /> */}



        <Section className = {styles.bg_secondary}>

        <AccordionCard title = 'Базовый лагерь экспедиции' className={styles.bg_primary}>
            <p>Усадьба «Жар. Птица» на озере Лама – более комфортных условий проживания в зимнее время на плато Путорана не существует. Уютный, большой и теплый дом с полноценными кроватями и свежим постельным бельем, ежедневная баня, вкусная еда с северным колоритом.</p>
            <GallerySlider photos={[
              {path: '/img/expeditions/glr/7.jpg',
                alt: ''
              },
              {path: '/img/expeditions/glr/8.jpg',
                alt: ''
              },
              {path: '/img/expeditions/glr/9.jpg',
                alt: ''
              },
              {path: '/img/expeditions/glr/10.jpg',
                alt: ''
              },
              {path: '/img/expeditions/glr/11.jpg',
                alt: ''
              },
              {path: '/img/expeditions/glr/12.jpg',
                alt: ''
              }
        ]} />
          </AccordionCard>

        </Section>


    </main>
  )
}

export default ArcticExpeditions