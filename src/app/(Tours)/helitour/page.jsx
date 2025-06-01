
import MainLogo from '../../Components/MainLogo/MainLogo'
import TourPageCover from '../../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../../Components/TextBlock/TextBlock'
import TourPageProgram from '../../Components/TourPageProgram/TourPageProgram'
import PhotoBlock from '../../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../../Components/RequestBlock/RequestBlock'
import { BACKGROUNDCOLORS } from '../../../constants/colors'
import { getTour } from '../../../lib/mongo/tours'


export const metadata = {
    title: 'Вертолетная экскурсия',
    description: 'Увидеть первозданную красоту природы с высоты птичьего полета? Вертолетная экскурсия гарантирует полный восторг и незабываемые впечатления!'
  }


const txtTitle = {
  title: "Транспорт",
  text: [
    "Экскурсия проводится на вертолете ВО 105 или Еврокоптер (вместимость — до 4 пассажиров)."
  ]
}



const HeliTour = async () => {
    const tour = await getTour('helitour').then( res => res.result)


  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {tour}/>
        <TourPageAbout tour = {tour} varInfoframe = {false}/>
        <TourPageProgram tour = {tour}/>
        <TextBlock 
            title = "Транспорт"
            titleWeight = '500'
            text = {[
              "Экскурсия проводится на вертолете ВО 105 или Еврокоптер (вместимость — до 4 пассажиров)."
            ]}
            titleAlign = 'right'
            textAlign = 'right'
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            />

        <div className='container'
            style = {{ 
                margin: '0 auto',
            }}>
          <h2>Карта маршрута</h2>
          <img src='./img/helimap.jpg'
            style = {{
                width: '100%'
            }}></img>
        </div>

        <PhotoBlock photos = {tour.tourPhoto}/>

        <RequestBlock bgImage = {'./img/helitour/helitour_req.jpg'}  h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default HeliTour