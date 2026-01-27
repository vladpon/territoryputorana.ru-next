import { BACKGROUNDCOLORS } from '../../../constants/colors'
import MainLogo from '../../Components/MainLogo/MainLogo'
import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'
import { getTour } from '../../../lib/mongo/tours'


export const metadata = {
    title: 'VIP-тур',
    description: 'Исследуйте с нами заповедный мир плато Путорана!'
  }


const LostWaterfalls = async () => {
    const tour = await getTour('lostwaterfalls').then( res => res.result)


  return (
    <main>
        {/* <MainLogo /> */}
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false} />
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
                'Трансферы по Норильску на автомобилях или микроавтобусах вип-класса.',
                'Заброска на плато Путорана на вертолете',
                'Водные экскурсии и возвращение в Норильск на скоростном закрытом судне на воздушной подушке.'
            ]}
            textAlign = 'right' />
       <RequestBlock bgImage = {'./img/lostwaterfalls/lostwaterfalls_req.jpg'}  h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default LostWaterfalls