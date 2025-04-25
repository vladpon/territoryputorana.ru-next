import styles from './InfoFrame.module.scss'

const InfoFrame = (props) => {
    const {price, title, reference, description, included, clothes} = props
  return (
            
        <div className = {styles["infoframe"]}>
                <h3>{title}</h3>
                {<div dangerouslySetInnerHTML={{__html: description}} />}
                <span className = {styles["infoframe__price"]}>{price}</span><br />
                {reference && (
                    <div className = {styles['infoframe__note']}><span>*{reference}</span></div>
                )}
                {included && <div className = {`${styles['infoframe__note']} ${styles['infoframe__note_included']}`}>
                        <span>*Что включено?</span>
                        <div className = {`${styles['infoframe__modal']} ${styles['display-switch']}`}>
                            <div className = {styles['modal__text']} dangerouslySetInnerHTML={{__html: included}}></div>
                        </div>
                    </div>}
                {clothes && <details>
                                <summary className = {`${styles['infoframe__note']} ${styles['infoframe__note_included']}`}><span>*Рекомендации по одежде и снаряжению</span></summary>
                                <div className = {styles['modal__text']} dangerouslySetInnerHTML={{__html: clothes}}></div>
                            </details>}
                    
        </div>
  )
}

export default InfoFrame