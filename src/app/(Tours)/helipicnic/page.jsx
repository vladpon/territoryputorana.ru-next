import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import MainLogo from "../../Components/MainLogo/MainLogo"
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'


import { COLORS, BACKGROUNDCOLORS } from '../../../constants/colors'

import { getTour } from '../../../lib/mongo/tours'
import { getMetadata, getPage } from '../../../lib/mongo/pages'



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

  const tour = await getTour(tourId).then( res => res.result)

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
        <TourPageProgram tour = {tour}/>
        <TextBlock
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
            />
        <PhotoBlock photos = {tour.tourPhoto}/>
        <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Транспорт'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
              'Наши гости перемещаются по всем маршрутам на комфортном и современном транспорте. Мы используем только проверенную и безопасную технику: автомобили премиум-класса и надёжные вертолёты.'         
            ]}
            textAlign = 'right' />
        <RequestBlock bgImage = {'./img/helipicnic/helipicnic_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Helipicnic