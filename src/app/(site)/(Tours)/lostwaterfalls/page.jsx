import { BACKGROUNDCOLORS } from '@/constants/colors'
import TourPageCover from '@/components/tour/TourPageCover/TourPageCover'
import TourPageAbout from '@/components/tour/TourPageAbout/TourPageAbout'
import AccordionCard from '@/components/ui/AccordionCard/AccordionCard'
import Section from '@/components/layout/Section/Section'
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import TourPageProgram from '@/components/tour/TourPageProgram/TourPageProgram'
import RequestBlock from '@/components/blocks/RequestBlock/RequestBlock'
import GallerySlider from "@/components/ui/PhotoSlider/PhotoSlider";
import { getTour } from '@/lib/mongo/tours'


export const metadata = {
    title: 'VIP-тур',
    description: 'Исследуйте с нами заповедный мир плато Путорана!'
  }


const LostWaterfalls = async () => {
    const tour = await getTour('lostwaterfalls')


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
        {/* <PhotoBlock photos = {tour.tourPhoto}/> */}
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