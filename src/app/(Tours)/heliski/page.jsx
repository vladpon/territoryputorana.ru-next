import { BACKGROUNDCOLORS, COLORS } from '../../../constants/colors'
import MainLogo from '../../Components/MainLogo/MainLogo'
import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'
import BigCards from '../../Components/BigCards/BigCards'
import { getTour } from '../../../lib/mongo/tours'


export const metadata = {
    title: 'Хели-ски',
    description: 'Высокий уровень безопасности и комфорта. Маневренный вертолет. Сертифицированные горные гиды-инструкторы.'
  }

const severgrandHotel = [
  {
    "id": "severgrand",
    "title": "Севергранд",
    "season": "",
    "time": "",
    "price": "",
    "bigImg": "",
    "smallImg": "./img/severgrand_logo03.svg",
    "optImg": "",
    "description": [
        "Новый отель 3* в центре Норильска. Комфортные номера с дизайнерским ремонтом: стандарт, стандарт Superior, Junior Suite, Luxe. Сервис  премиум-уровня и теплое арктическое гостеприимство."
        ],
    "tourPhoto": [],
    "contacts": {
        "tel": "+73919457038",
        "email": "hotel@severgrand.ru",
        "site": "https://severgrand.ru"
    },
    "href": "https://severgrand.ru",
    "section": "Гостиницы"
  }
]




const Heliski = async () => {
    const tour = await getTour('heliski').then( res => res.result)

  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false} />
        <TextBlock 
            text = {[
                'Перепады высот: 400 м — 800 м за один спуск',
                'Зона катания: преимущественно альпийский рельеф',
                'Калькуляция летного времени: поминутная, время считается от начала вращения винта и прекращается с его остановкой.'
            ]}
            textColor = {COLORS.white}
            backgroundcolor = {COLORS.mainBlue}
            />
        <TourPageProgram tour = {tour}/>
        <TextBlock  
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'ОТКРЫТО БРОНИРОВАНИЕ: МАРТ-ИЮНЬ 2025'
            titleAlign = 'center'
            text = {['стандартная программа - для групп 4 человека, частная программа - для групп 3 человека.']}
            textAlign = 'center'
            />
        <div className='container' style = {{margin: '0 auto'}}>
          <BigCards content = {severgrandHotel} imgFitContain = {true}/>
        </div>        
        <RequestBlock bgImage = {'./img/helireqback.JPG'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Heliski