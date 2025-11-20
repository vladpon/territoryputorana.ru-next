import { BACKGROUNDCOLORS, COLORS } from '../../constants/colors'
import MainLogo from '../Components/MainLogo/MainLogo'
import TourPageCover from '../Components/TourPageCover/TourPageCover'
import TourPageAbout from '../Components/TourPageAbout/TourPageAbout'
import TextBlock from '../Components/TextBlock/TextBlock'
import PhotoBlock from '../Components/PhotoBlock/PhotoBlock'
import RequestBlock from '../Components/RequestBlock/RequestBlock'
import { getJar } from '../../lib/mongo/jar'
import { getMetadata } from '../../lib/mongo/pages'



export async function generateMetadata()
  {     
    const metadata = await getMetadata('jar')
       return {
        title: metadata.title,
        description: metadata.description
       }
}


const txtTitle = {
  title: "Транспорт",
  text: [
    'Услуги трансфера не входят в стоимость аренды. При необходимости организовать трансфер, мы можем рекомендовать наших партнеров для доставки вашей группы на усадьбу «Жар. Птица»:	в летнее время - судно на воздушной подушке (500 000 руб. за группу), вертолёт (350 000 руб/час при поминутной тарификации), в зимнее время - вездеход Север-Трак (250 000 руб. за группу). Также гости могут добраться на усадьбу самостоятельно.'
  ]
}


const Jar =  async() => {
    const data = await getJar().then( res =>  res.result[0])
    
  return (
    <main>
        <MainLogo />
        <TourPageCover tour = {data}/>
        <TourPageAbout tour = {data} varInfoframe = {false}/>
        <TextBlock
            backgroundcolor = {COLORS.mainBlue}
            title = 'Во время отдыха мы можем организовать для вас:'
            titleAlign = 'center'
            titleColor = {COLORS.white}
            titleWeight = '700'
            list = {
                [
                    'водно-пешие экскурсии по достопримечательностям и потрясающим видовым локациям плато Путорана,',
                    'вертолетные экскурсии в Путоранский заповедник,',
                    'гастрономический ужин из адаптированных блюд национальной северной кухни с олениной и северной рыбой,',
                    'пикник на горной вершине или возле водопада,',
                    'рыбалку.'
                ]
            }
            listColor = {COLORS.white}
            listAlign = 'left'
        />
        <PhotoBlock photos = {data.tourPhoto}/>
        <TextBlock
            backgroundcolor = {BACKGROUNDCOLORS.secondary}
            title = 'Транспорт'
            titleAlign = 'right'
            titleWeight = '500'
            text = {[
                'Услуги трансфера не входят в стоимость аренды. При необходимости организовать трансфер, мы можем рекомендовать наших партнеров для доставки вашей группы на усадьбу «Жар. Птица»: в летнее время - судно на воздушной подушке (500 000 руб. за группу), вертолёт (350 000 руб/час при поминутной тарификации), в зимнее время - вездеход Север-Трак (250 000 руб. за группу). Также гости могут добраться на усадьбу самостоятельно.'
            ]}
        />
        <RequestBlock bgImage = {'./img/jar/jar_req.jpg'} h2Text = {"Оставить заявку на тур"} h3Text = {"Заполните форму, и мы ответим Вам в ближайшее время!"}/>
    </main>
  )
}

export default Jar