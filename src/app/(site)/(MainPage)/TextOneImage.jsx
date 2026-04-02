
import styles from './TextOneImage.module.scss'



const textOneImage = {
  title_h2: 'Территория Путорана',
  title_h3: 'Покори Север с нами!',
  text: [
    'Мы занимаемся организацией туров и экспедиций на плато Путорана уже больше 10 лет и знаем, чем удивить самого искушенного путешественника.',
    'Программы наших туров построены так, чтобы за отведённое время, показать Вам самое лучше, необычное и впечатляющее. Знаменитые открыточные виды и тайные уголки, известные только нашим гидам, полёты на вертолётах и аутентичная северная кухня.',
    'Здесь, в дикой первозданной природе, мы позаботимся о Вашем максимальном удобстве и комфорте.',
    'Антон Лысов',
    'Основатель и руководитель компании «Территория Путорана»'
  ],
  img: "./img/anton2.jpg"
}

const TextOneImage = () => {
    
    return (
        <div className={`${styles['bg-container']}`}>
            <div className={`${styles["txt-oimg__title"]} container`}>
                            <h2><span>Территория</span> Путорана</h2>
                            <p>{textOneImage.title_h3}</p>
                        </div>
            <div className={`${styles["txt-oimg"]} container`}>
                
                <div className={styles["txt-oimg__img"]}>
                    <img src={textOneImage.img} />
                </div>
                <div className={styles["txt-oimg__text-block"]}>
                    <div className={styles["txt-oimg__text"]}>
                        {textOneImage.text.map( (p, index) => <p key = {index}>{p}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextOneImage