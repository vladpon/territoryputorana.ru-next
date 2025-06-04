import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import MainLogo from "../../Components/MainLogo/MainLogo"
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'

import { COLORS, BACKGROUNDCOLORS } from '../../../constants/colors'

import { getTour } from '../../../lib/mongo/tours'
import { getPage } from '../../../lib/mongo/pages'


const page = await getPage('lostput')

// export const metadata = {
//   title: 'Затерянный мир плато Путорана',
//   description: 'Динамичный недельный тур на плато Путорана. Размещение с комфортом класса люкс. Трекинговые маршруты, каньоны, водопады. Водные прогулки. Вертолетные экскурсии. Гастрономический туризм.'
// }

export const metadata = {
  title: page.title,
  description: page.description
}


const Lostput = async () => {

  const tour = await getTour('lostput').then( res => res.result)


  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {true}/>
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
                'Комфортабельные гостевые дома для одно- и двухместного размещения, с душем и санузлом',
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
              'Трансферы по Норильску будут выполняться на автомобилях или микроавтобусах (в зависимости от количества человек в группе).',
              'Заброска на озеро Лама и обратно будет осуществляться на скоростном закрытом катере на воздушной подушке. На активных дневных маршрутах также будут использоваться судно на воздушной подушке и моторные лодки.'
            ]}
            textAlign = 'right' />
        <RequestBlock bgImage = {'./img/lostput/lostput_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Lostput