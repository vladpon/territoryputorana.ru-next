
import styles from './TextOneImage.module.scss'

const TextOneImage = (props) => {
    const { textOneImage } = props
    return (
        <div className={`${styles['bg-container']}`}>
            <div className={`${styles["txt-oimg"]} container`}>
                <div className={styles["txt-oimg__img"]}>
                    {/* <img src={textOneImage.img} /> */}
                </div>
                <div className={styles["txt-oimg__text-block"]}>
                        {/* <div className={styles["txt-oimg__title"]}>
                            <h2>{textOneImage.title_h2}</h2>
                            <h3>{textOneImage.title_h3}</h3>
                        </div> */}
                    <div className={styles["txt-oimg__text"]}>
                        {textOneImage.text.map( (p, index) => <p key = {index}>{p}</p>)}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default TextOneImage