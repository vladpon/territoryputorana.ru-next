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

  const tour = await getTour(tourId).then( res => res.result)

  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
        <TourPageProgram tour = {tour}/>
        <TextBlock
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
            />
        <PhotoBlock photos = {tour.tourPhoto}/>
        <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Дополнительные условия'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
              'Вертолётная экскурсия оплачивается дополнительно — от 760 000 руб/группа.',
              'Стоимость авиаперелёта до Норильска, проживание и питание в Норильске не входят в стоимость тура.'         
            ]}
            textAlign = 'right' />
        <RequestBlock bgImage = {'./img/lostput/lostput_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Icedrift