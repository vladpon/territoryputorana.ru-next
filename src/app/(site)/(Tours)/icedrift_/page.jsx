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

import styles from './Icedrift.module.scss'
import PhotoBlock from '@/components/blocks/PhotoBlock/PhotoBlock'



const tourId = 'icedrift'
export async function generateMetadata()
  {     
    const metadata = await getMetadata(tourId)
       return {
        title: metadata.title,
        description: metadata.description
       }
}



const Icedrift = async () => {

  const tour = await getTour(tourId)

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false} lightness = 'light'/>
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
                'Гастрономическое сопровождение с локальными специалитетами — олениной и северной рыбой'
              ]}
              listAlign = 'left'
            /> */}
        {/* <PhotoBlock photos = {tour.tourPhoto}/> */}
        {/* <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Дополнительные условия'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
              'Вертолётная экскурсия оплачивается дополнительно — от 760 000 руб/группа.',
              'Стоимость авиаперелёта до Норильска, проживание и питание в Норильске не входят в стоимость тура.'         
            ]}
            textAlign = 'right' /> */}
            <Section className = {styles.bg_secondary}>

          <AccordionCard title = 'Проживание' className={styles.bg_primary}>
            <p>На усадьбе «Жар. Птица» созданы все условия для того, чтобы вы могли насладиться красотами северной природы, не лишая себя привычного сервиса и комфорта:</p>
            <ul>
              <li>Комфортабельный гостевой дом с гостиной и отдельными комнатами для одно- и двухместного размещения, с кухней, душем и санузлом</li>
              <li>Баня с просторной комнатой отдыха и купелью с кристально чистой речной водой на террасе</li>
              <li>Беседка-барбекю</li>
              <li>Спутниковое телевидение, телефон и интернет</li>        
            </ul>
            <GallerySlider photos={
                                                                [
                                                                  {
                                                                    "path": "/img/icedrift/accmdtn/accmdtn_01.jpg",
                                                                    "alt": ""
                                                                  },
                                                                  {
                                                                    "path": "/img/icedrift/accmdtn/accmdtn_02.jpg",
                                                                    "alt": ""
                                                                  },
                                                                  {
                                                                    "path": "/img/icedrift/accmdtn/accmdtn_03.jpg",
                                                                    "alt": ""
                                                                  },
                                                                  {
                                                                    "path": "/img/icedrift/accmdtn/accmdtn_04.jpg",
                                                                    "alt": ""
                                                                  }
                                                                ]} />
          </AccordionCard>

          <AccordionCard title = 'Дополнительные условия' className={styles.bg_primary}>
              <p>Вертолётная экскурсия оплачивается дополнительно — от 760 000 ₽ за группу</p>
              <p>Стоимость авиаперелёта до Норильска, проживание и питание в Норильске не входят в стоимость тура.</p>
          </AccordionCard>

          
        </Section>

        <PhotoBlock photos = {[
                                                      {
                                                          "path": "/img/snowqueen/glr/1.jpg",                       
                                                          "alt": ""
                                                      },
                                                      {
                                                          "path": "/img/snowqueen/glr/2.jpg",
                                                          "alt": ""
                                                      },
                                                      {
                                                          "path": "/img/snowqueen/glr/3.jpg",
                                                          "alt": ""
                                                      },
                                                      {
                                                          "path": "/img/snowqueen/glr/4.jpg",
                                                          "alt": ""
                                                      },
                                                      {
                                                          "path": "/img/snowqueen/glr/5.jpg",
                                                          "alt": ""
                                                      }
                                                  ]}/>
        <RequestBlock bgImage = {'./img/icedrift/icedrift_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Icedrift