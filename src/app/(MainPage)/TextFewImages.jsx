
import styles from './TextFewImages.module.scss';


const textFewImages = {
  photo: [
    './img/exped1.jpg',
    './img/exped2.jpg',
    './img/exped3.jpg',
    './img/exped4.jpg'
  ],
  title_h2: 'Экспедиции Арктики',
  title_h3: '',
  text: 'Вы можете стать участниками настоящей арктической экспедиции. Вместе с профессиональной командой на снегоходах вы отправитесь на разведку вглубь плато Путорана к первозданной природе, незнакомой с человеком.'
}


const TextFewImages = () => {

  return (
    <div className = {`${styles["txt-fimg"]} container`} >
        <div className={styles["txt-fimg__text"]}>
            <h2><a href='/arcticexpeditions'><span>Экспедиции</span> Арктики</a></h2>
            { textFewImages.title_h3 && (<h3>{textFewImages.title_h3}</h3>)}
            <p>{textFewImages.text}</p>
        </div>
        <div className = {styles["txt-fimg__ph-container"]}>
            { textFewImages.photo ? (
                textFewImages.photo.map( (photo, index) => <div className = {styles["txt-fimg__photo"]} key = {index}><img src={photo} /></div>
                )
            ) : <h3>no photo found</h3>
            }                
        </div>
        
    </div>
  )
}

export default TextFewImages