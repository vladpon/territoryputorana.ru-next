import TourPageCover from '@/components/tour/TourPageCover/TourPageCover'
import TourPageAbout from '@/components/tour/TourPageAbout/TourPageAbout'
import AccordionCard from '@/components/ui/AccordionCard/AccordionCard'
import Section from '@/components/layout/Section/Section'
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import TourPageProgram from '@/components/tour/TourPageProgram/TourPageProgram'
import RequestBlock from '@/components/blocks/RequestBlock/RequestBlock'
import GallerySlider from "@/components/ui/PhotoSlider/PhotoSlider";

import styles from './Helifishing.module.scss'

import { COLORS, BACKGROUNDCOLORS } from '@/constants/colors'

import { getTour } from '@/lib/mongo/tours'
import { getMetadata, getPage } from '@/lib/mongo/pages'
import PhotoBlock from '@/components/blocks/PhotoBlock/PhotoBlock'



const tourId = 'helifishing'
export async function generateMetadata()
  {     
    const metadata = await getMetadata(tourId)
       return {
        title: metadata.title,
        description: metadata.description
       }
}



const Helifishing = async () => {

  const tour = await getTour(tourId)
  const transport = await fetch('https://territoryputorana.ru/data/transport.json').then( (res => res.json()))
  

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
                'Снаряжение для сапбординга, пакрафтинга, рыбалки'
              ]}
              listAlign = 'left'
            /> */}
            
        
        {/* <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Транспорт'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
              'Учитывайте разницу во времени с Москвой +4 часа.',
              'Этот тур можно провести в формате тура выходного дня.',
              'Вылетая из Москвы вечером в четверг, вы прибудете в Норильск утром в пятницу, мы встретим вас в аэропорту и сразу отправимся в путешествие.',
              'Обратный вылет из Норильска будет утром понедельник. В Москву вы прибудете практически в тоже время, в которое вылетели из Норильска.',
              'По вашему желанию мы можем доставить вас в аэропорт Норильска ко времени обратного вылета на вертолёте прямо с усадьбы «Жар. Птица», либо организовать одну ночевку в гостинице в Норильске.'         
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
                <li>Снаряжение для сапбординга, пакрафтинга, рыбалки</li>              
              </ul>
              <GallerySlider photos={
                                        [
                                          {
                                            "path": "/img/tr_ph01.jpg",
                                            "alt": "Усадьба \"Жар. Птица\""
                                          },
                                          {
                                            "path": "/img/tr_ph02.jpg",
                                            "alt": ""
                                          },
                                          {
                                            "path": "/img/tr_ph03.jpg",
                                            "alt": ""
                                          },
                                          {
                                            "path": "/img/tr_ph04.jpg",
                                            "alt": ""
                                          },
                                          {
                                            "path": "/img/tr_ph05.jpg",
                                            "alt": ""
                                          },
                                          {
                                            "path": "/img/tr_ph06.jpg",
                                            "alt": ""
                                          }
                                        ]} />
            </AccordionCard>

            <AccordionCard title = 'Транспорт' className={styles.bg_primary}>
                <p>Учитывайте разницу во времени с Москвой +4 часа.</p>
                <p>Этот тур можно провести в формате тура выходного дня.</p>
                <p>Вылетая из Москвы вечером в четверг, вы прибудете в Норильск утром в пятницу, мы встретим вас в аэропорту и сразу отправимся в путешествие.</p>
                <p>Обратный вылет из Норильска будет утром понедельник. В Москву вы прибудете практически в тоже время, в которое вылетели из Норильска.</p>
                <p>По вашему желанию мы можем доставить вас в аэропорт Норильска ко времени обратного вылета на вертолёте прямо с усадьбы «Жар. Птица», либо организовать одну ночевку в гостинице в Норильске.</p>
              <GallerySlider photos={[
                                                                        {
                                                                            "path": "/img/helifishing/transport/transport_01.jpg",                       
                                                                            "alt": ""
                                                                        },
                                                                        {
                                                                            "path": "/img/helifishing/transport/transport_02.jpg",
                                                                            "alt": ""
                                                                        },
                                                                        {
                                                                            "path": "/img/helifishing/transport/transport_03.jpg",
                                                                            "alt": ""
                                                                        },
                                                                        {
                                                                            "path": "/img/helifishing/transport/transport_04.jpg",
                                                                            "alt": ""
                                                                        }
                                                                    ]} />
            </AccordionCard>

            <AccordionCard title = 'Рекомендации по одежде и снаряжению' className={styles.bg_primary}>
                <div dangerouslySetInnerHTML={{__html: tour.clothes}}></div>
            </AccordionCard>
          </Section>

              <PhotoBlock photos = {tour.tourPhoto}/>
        <RequestBlock bgImage = {'./img/helifishing/helifishing_req1.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Helifishing