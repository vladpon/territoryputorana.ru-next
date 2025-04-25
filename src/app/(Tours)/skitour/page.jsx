import { BACKGROUNDCOLORS, COLORS } from '../../../constants/colors'
import { fetchTours } from '../../../api/fetchTours'
import MainLogo from '../../Components/MainLogo/MainLogo'
import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'


export const metadata = {
    title: 'Ски-тур',
    description: 'Недельный лыжный тур на плато Путорана. Комфортабельный теплый глэмпинг. Авторские маршруты. Профессиональные гиды.'
  }


const SkiTour = async () => {
    const tour = await fetchTours().then( (t) => t.filter( (item) => item.tourId == 'skitour')[0])

  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false} />
        <TextBlock
            backgroundcolor = {COLORS.mainBlue}
            text = {['Маршруты ски-тура построены таким образом, чтобы показать вам самые впечатляющие зимние пейзажи плато Путорана. В пути гармонично выстроены подъемы, спуски и переходы по снежным просторам.']}
            textAlign = 'left'
            textColor = {COLORS.white}
        />
        <TourPageProgram tour = {tour}/>

        <TextBlock
            text = {['Для перевозки участников ски-тура к месту расположения базового лагеря мы используем вездеходы СеверТрак или Ратрак. Гости размещаются в Хижине с необходимыми для комфортного размещения условиями. Приготовление еды осуществляется участниками ски-тура самостоятельно. Хозяйственный работник обеспечивает постоянный порядок и уют в базовом лагере. Для обеспечения безопасности и экстренной эвакуации в лагере находится дежурный снегоход.']}
            textAlign = 'center'
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
        /> 
        <PhotoBlock photos = {tour.tourPhoto} />
        
        <RequestBlock bgImage = {'./img/skitour/skitour_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default SkiTour