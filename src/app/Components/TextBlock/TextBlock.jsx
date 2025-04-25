'use client'
import styles from './TextBlock.module.scss'
import classNames from 'classnames/bind'
import { COLORS, BACKGROUNDCOLORS } from '../../../constants/colors'
import Link from 'next/link'


const TextBlock = (props) => {
    const {
        title, 
        text, 
        list, 
        backgroundcolor = BACKGROUNDCOLORS.primary, 
        titleColor = COLORS.black, 
        textColor = COLORS.black, 
        listColor = COLORS.black, 
        titleAlign = 'center',
        textAlign = 'center',
        listAlign = 'center',
        titleTransform = 'none',
        titleWeight,
        aText
    } = props
  return (
    <div className={styles.textBlock} style = {{backgroundColor: backgroundcolor}}>
        <div className={classNames(styles.textBlock__container, 'container')}>
            {title && <h2 style = {{color: titleColor, textAlign: titleAlign, textTransform: titleTransform, fontWeight: titleWeight}}>{title}</h2>}
            {text && ( aText ? (
                <p style = {{color: textColor, textAlign: textAlign}}>{text[0]}
                <Link href={aText.href} style = {{color: textColor, textAlign: textAlign}}>{aText.link}</Link>
                {aText.text}
                </p>
             ) : text.map( (p, index) => <p key={index} style = {{color: textColor, textAlign: textAlign}}>{p}</p>))}
            {list && (
                <ul>
                    {list.map( (li, index) => <li key={index} style = {{color: listColor, textAlign: listAlign}}>{li}</li>)}
                </ul>
            )}
        </div>
    </div>
  )
}

export default TextBlock