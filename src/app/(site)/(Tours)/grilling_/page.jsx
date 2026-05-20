import TourPageCover from '@/components/tour/TourPageCover/TourPageCover'
import TourPageAbout from '@/components/tour/TourPageAbout/TourPageAbout'
import AccordionCard from '@/components/ui/AccordionCard/AccordionCard'
import Section from '@/components/layout/Section/Section'
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import TourPageProgram from '@/components/tour/TourPageProgram/TourPageProgram'
import RequestBlock from '@/components/blocks/RequestBlock/RequestBlock'
import GallerySlider from "@/components/ui/PhotoSlider/PhotoSlider";


import { COLORS, BACKGROUNDCOLORS } from '@/constants/colors'

import { getTour } from '@/lib/mongo/tours'
import { getMetadata, getPage } from '@/lib/mongo/pages'

import styles from './Grilling.module.scss'

const tourId = 'grilling'
export async function generateMetadata()
  {     
    const metadata = await getMetadata(tourId)
       return {
        title: metadata.title,
        description: metadata.description
       }
}



const Grilling = async () => {

  const tour = await getTour(tourId)
  const transport = await fetch('https://territoryputorana.ru/data/transport.json').then( (res => res.json()))

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
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

          <TextBlock 
              title = {'Авторская концепция гастро-экспедиции'} 
              text = {['Целая неделя за полярным кругом, где:']} 
              titleAlign = 'center'
              textAlign = 'left'
              listAlign = 'left'
              list = {[
                'Дикая первозданная природа и много настоящей свободы',
                'Ценнейшая рыба северных пород ловится и коптится в тот же день',
                'Мясо северного оленя готовится на живом огне',
                'Еда – основа путешествия, а не сервис',
                'Гриль – не шоу и не способ приготовления, а язык общения'
              ]}
              backgroundcolor = {BACKGROUNDCOLORS.primary} 
              titleColor = {COLORS.black} 
              textColor = {COLORS.black}/>


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
        <RequestBlock bgImage = {'./img/grilling/grilling_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Grilling