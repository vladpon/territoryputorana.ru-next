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

import styles from './Helipicnic.module.scss'
import PhotoBlock from '@/components/blocks/PhotoBlock/PhotoBlock'

import transport from '../../../../data/transport.json'

const tourId = 'helipicnic'
export async function generateMetadata()
  {     
    const metadata = await getMetadata(tourId)
       return {
        title: metadata.title,
        description: metadata.description
       }
}



const Helipicnic = async () => {

  const tour = await getTour(tourId)
  // const transport = await fetch('https://territoryputorana.ru/data/transport.json').then( (res => res.json()))


  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false} lightness = 'light'/>
        <TourPageProgram tour = {tour}/>
        {/* <TextBlock
              backgroundcolor = {BACKGROUNDCOLORS.secondary}
              title = 'Безопасность и комфорт'
              text = {['Команда сопровождения позаботится о вашем комфорте и безопасности. В местах стоянок убудет устанавливаться палатка с биотуалетом, для пикника — мобильный глэмпинг для вашего отдыхаю',
                'Мы с большим уважением относимся к вашей частной жизни, поэтому обеспечим полную конфиденциальность.'
              ]}
              titleAlign = 'center'
              textAlign = 'left'
              titleTransform = 'uppercase'
              titleWeight = '400'
              listAlign = 'left'
            /> */}
        {/* <PhotoBlock photos = {tour.tourPhoto}/> */}
        {/* <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Транспорт'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
              'Наши гости перемещаются по всем маршрутам на комфортном и современном транспорте. Мы используем только проверенную и безопасную технику: автомобили премиум-класса и надёжные вертолёты.'         
            ]}
            textAlign = 'right' /> */}

        <Section className = {styles.bg_secondary}>

          <AccordionCard title = 'Безопасность и комфорт' className={styles.bg_primary}>
            <p>Команда сопровождения позаботится о вашем комфорте и безопасности. В местах стоянок убудет устанавливаться палатка с биотуалетом, для пикника — мобильный глэмпинг для вашего отдыхаю</p>
            <p>Мы с большим уважением относимся к вашей частной жизни, поэтому обеспечим полную конфиденциальность.</p>
          
          </AccordionCard>

          <AccordionCard title = 'Транспорт' className={styles.bg_primary}>
              <p>Наши гости перемещаются по всем маршрутам на комфортном и современном транспорте. Мы используем только проверенную и безопасную технику: автомобили премиум-класса и надёжные вертолёты.</p>
          </AccordionCard>


        </Section>

        <PhotoBlock photos = {tour.tourPhoto}/>
        <RequestBlock bgImage = {'./img/helipicnic/helipicnic_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Helipicnic