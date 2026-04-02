import React from 'react'
import styles from './MainPage.module.scss'

const TextWord = (props) => {
    const { text, word } = props

  return (
    <div className={styles['text-word']}>
            <div className={styles["text-word__word"]}><span>{word}</span></div>
            <div className={`${styles["text-word__text"]} container`}><p>{text}</p></div>
    </div>
  )
}

export default TextWord