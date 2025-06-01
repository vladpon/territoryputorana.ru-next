import { BACKGROUNDCOLORS } from '../../../constants/colors'
import MainLogo from '../../Components/MainLogo/MainLogo'
import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import { getTour } from '../../../lib/mongo/tours'

export const metadata = {
    title: 'Скитур долина озера Лама',
    description: ''
  }


const Skilama = async () => {
    const tour = await getTour('skilama').then( res => res.result)

  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>\
        <TourPageProgram tour = {tour}/>
        <PhotoBlock photos = {tour.tourPhoto}/>
        <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Обеспечение тура'
            titleWeight = '500'
            titleAlign = 'right'
            text = {[
                'Для перевозки участников скитура к месту расположения базового лагеря мы используем вездеходы Север-Трак. Гости размещаются в благоустроенном гостевом доме на усадьбе «Жар. Птица», где созданы все необходимые для комфортного отдыха условия, в том числе баня и био-туалет. Приготовление еды может осуществляться участниками скитура самостоятельно либо с привлечением нашего повара. Хозяйственный работник отвечает за постоянный порядок и уют в базовом лагере. Для обеспечения безопасности и экстренной эвакуации в лагере находится дежурный снегоход, организована спутниковая связь.'
            ]}
            textAling = 'right'
        />
        <RequestBlock bgImage = {'./img/skilama/skilama_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Skilama