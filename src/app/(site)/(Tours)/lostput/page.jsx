export const dynamic = "force-dynamic"

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

import styles from './Lostput.module.scss'




const tourId = 'lostput'
export async function generateMetadata()
  {     
    const metadata = await getMetadata(tourId)
       return {
        title: metadata.title,
        description: metadata.description
       }
}



const Lostput = async () => {

  const transport = await fetch('https://territoryputorana.ru/data/transport.json').then( (res => res.json()))
  const tour = await getTour(tourId)

  if (!tour) notFound()

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
        <TextBlock 
              title = {tour.varDetailstitle} 
              text = {['Организацией туров для сборных групп занимаются наши постоянные партнеры Russia Discovery. Доступные для бронирования даты можно посмотреть ']} 
              aText = {{
                        link: 'здесь', 
                        href: 'https://www.russiadiscovery.ru/tours/putorana-plateau-gory-bez-vershin/'
                  }}
              backgroundcolor = {BACKGROUNDCOLORS.primary} 
              titleColor = {COLORS.black} 
              textColor = {COLORS.black}
              titleAlign = {'center'}
              textAlign = {'left'}/>

          
        
        <TourPageProgram tour = {tour}/>


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

        <RequestBlock bgImage = {'./img/lostput/lostput_req1.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Lostput