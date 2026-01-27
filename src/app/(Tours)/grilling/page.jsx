import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import MainLogo from "../../Components/MainLogo/MainLogo"
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'


import { COLORS, BACKGROUNDCOLORS } from '../../../constants/colors'

import { getTour } from '../../../lib/mongo/tours'
import { getMetadata, getPage } from '../../../lib/mongo/pages'



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

  const tour = await getTour(tourId).then( res => res.result)

  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
        <TextBlock 
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
              textAlign = {'left'}/>
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
                'Малые лесные дома и глэмпинги для двухместного размещения',
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
              'Трансферы по Норильску на автомобилях или микроавтобусах (в зависимости от количества человек в группе).',
              'Заброска на озеро Лама и обратно на скоростном закрытом катере на воздушной подушке. На активных дневных маршрутах мы также перемещаемся на судне на воздушной подушке.'
            ]}
            textAlign = 'right' />
        <RequestBlock bgImage = {'./img/grilling/grilling_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Grilling