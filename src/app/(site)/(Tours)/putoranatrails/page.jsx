

import { COLORS, BACKGROUNDCOLORS } from '@/constants/colors'

import { getTour } from '@/lib/mongo/tours'

import TourPageCover from '@/components/tour/TourPageCover/TourPageCover'
import TourPageAbout from '@/components/tour/TourPageAbout/TourPageAbout'
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import TourPageProgram from '@/components/tour/TourPageProgram/TourPageProgram'
import RequestBlock from '@/components/blocks/RequestBlock/RequestBlock'
import GallerySlider from "@/components/ui/PhotoSlider/PhotoSlider";
import Section from '@/components/layout/Section/Section'

import AccordionCard from '@/components/ui/AccordionCard/AccordionCard'
import styles from './PutoranaTrails.module.scss'
import PhotoBlock from '@/components/blocks/PhotoBlock/PhotoBlock'

// const txtTitle = {
//   title: "Транспорт",
//   text: [
//     'Трансферы по Норильску будут выполняться на автомобилях или микроавтобусах (в зависимости от количества человек в группе).',
//     'Заброска на озеро Лама и обратно будет осуществляться на скоростном закрытом катере на воздушной подушке. На активных дневных маршрутах также будут использоваться судно на воздушной подушке и моторные лодки.'
//   ]
// }

export const metadata = {
    title: 'Тропами Путорана | Активный треккинг: приключения в дикой природе | Туры на плато Путорана',
    description: 'Тропами Путорана | Активный треккинг: приключения в дикой природе | Туры на плато Путорана | Ежедневные радиальные выходы Размер группы: 12 человек Продолжительность: 8 дней / 7 ночей Проживание: 6 ночей – благоустроенная усадьба на озере Лама. 1 ночь – гостиница в Норильске Уровень: хорошая спортивная форма Стоимость за группу: 3 300 000 руб. от 275 000 руб/чел.'
  }


const PutoranaTrails = async () => {
    const tour = await getTour('putoranatrails')
    const transport = await fetch('https://territoryputorana.ru/data/transport.json').then( (res => res.json()))

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {true}/>
        <TextBlock 
              title = {tour.varDetailstitle} 
              text = {['Организацией туров для сборных групп занимаются наши постоянные партнеры Russia Discovery. Доступные для бронирования даты можно посмотреть ']} 
              aText = {{
                        link: 'здесь', 
                        href: 'https://www.russiadiscovery.ru/tours/putorana-trekking-na-plato-putorana/'
                  }}
              backgroundcolor = {BACKGROUNDCOLORS.primary} 
              titleColor = {COLORS.black} 
              textColor = {COLORS.black}
              titleAlign = {'center'}
              textAlign = {'left'}/>
        {/* <TextBlock
                title = 'Дополнительно'
                text = {['Вы можете заказать ']} 
                aText = {{
                            link: 'вертолетную экскурсию', 
                            href: '/helitour',
                            text: [' чтобы облететь наиболее живописные и недоступные уголки плато Путорана. Вы увидите высочайшие в России водопады и бездонные каньоны, а возможно, даже встретитесь с путоранским снежным бараном — уникальным животным-эндемиком, обитающим в этих краях.']
                    }}
                backgroundcolor = {COLORS.mainBlue} 
                titleColor = {COLORS.white} 
                textColor = {COLORS.white}
                titleAlign = {'center'}
                textAlign = {'left'}/> */}
        <TourPageProgram tour = {tour}/>
        {/* <TextBlock
              backgroundcolor = {BACKGROUNDCOLORS.secondary}
              title = 'Проживание'
              text = {['На усадьбе «Жар. Птица» созданы все условия для того, чтобы вы могли насладиться красотами северной природы, не лишая себя привычного сервиса и комфорта:']}
              titleAlign = 'center'
              textAlign = 'left'
              titleTransform = 'uppercase'
              titleWeight = '400'
              list = {[
                'Комфортабельный гостевой дом с гостиной и отдельными комнатами для одно- и двухместного размещения, с кухней, душем и санузлом',
                'Малые лесные дома и глэмпинги для двухместного размещения',
                'Баня с просторной комнатой отдыха и купелью с кристально чистой речной водой на террасе',
                'Беседка-барбекю',
                'Спутниковое телевидение, телефон и интернет',
                'Снаряжение для сапбординга, пакрафтинга, рыбалки'
              ]}
              listAlign = 'left'
            /> */}
        {/* <PhotoBlock photos = {tour.tourPhoto}/> */}
        {/* <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Транспорт'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[                
                'Трансферы по Норильску на автомобилях или микроавтобусах (в зависимости от количества человек в группе).',
                'Заброска на озеро Лама и обратно на скоростном закрытом катере на воздушной подушке. На активных дневных маршрутах мы также перемещаемся на судне на воздушной подушке.'
             ]}
            textAlign = 'right' /> */}
        <Section className = {styles.bg_secondary}>

          <AccordionCard title = 'Проживание' className={styles.bg_primary}>
            <p>На усадьбе «Жар. Птица» созданы все условия для того, чтобы вы могли насладиться красотами северной природы, не лишая себя привычного сервиса и комфорта:</p>
            <ul>
              <li>Комфортабельный гостевой дом с гостиной и отдельными комнатами для одно- и двухместного размещения, с кухней, душем и санузлом</li>
              <li>Малые лесные дома и глэмпинги для двухместного размещения</li>
              <li>Баня с просторной комнатой отдыха и купелью с кристально чистой речной водой на террасе</li>
              <li>Беседка-барбекю</li>
              <li>Спутниковое телевидение, телефон и интернет</li>
              <li>Снаряжение для сапбординга, пакрафтинга, рыбалки</li>              
            </ul>
            <GallerySlider photos={tour.tourPhoto} />
          </AccordionCard>

          <AccordionCard title = 'Транспорт' className={styles.bg_primary}>
              <p>Трансферы по Норильску на автомобилях или микроавтобусах (в зависимости от количества человек в группе).</p>
              <p>Заброска на озеро Лама и обратно на скоростном закрытом катере на воздушной подушке. На активных дневных маршрутах мы также перемещаемся на судне на воздушной подушке.</p>
            {transport.photo ? <GallerySlider photos={transport.photo} /> : <span>Loading...</span>}
          </AccordionCard>

          <AccordionCard title = 'Рекомендации по одежде и снаряжению' className={styles.bg_primary}>
              <div dangerouslySetInnerHTML={{__html: tour.clothes}}></div>
          </AccordionCard>

        </Section>
        <RequestBlock bgImage = {'./img/putoranatrails/putoranatrails_req.jpg'}  h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default PutoranaTrails