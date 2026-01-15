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
                'Снаряжение для сапбординга, пакрафтинга, рыбалки'
              ]}
              listAlign = 'left'
            />
        <PhotoBlock photos = {tour.tourPhoto}/>
        <TextBlock
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
            textAlign = 'right' />
        <RequestBlock bgImage = {'./img/lostput/lostput_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Helifishing