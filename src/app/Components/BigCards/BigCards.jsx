'use client'

import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import styles from './BigCards.module.scss'



const BigCards = (props) => {
    const { content,  sections, imgFitContain } = props
    const [filteredContent, setFilteredContent] = useState(content)
    const [activeSection, setActiveSection] = useState('')


    useEffect( () => {
        sections && setFilteredContent(content.filter( (item) => activeSection.includes(item.section)))                
    }, [activeSection])

    useEffect( () => {
        sections && setActiveSection(sections[0])
    }, [])

    const handleSectionButton = (section) => 
        setActiveSection(section)


  return (
    <div className = {styles["big-cards"]}>
        {sections && (
                        <div className= {styles['big-cards__sections']}>
                            {sections.map((value) => (
                                <button  key={value} onClick={() => handleSectionButton(value)} className = {activeSection.includes(value) ? `${styles.active} ${styles['main-button']}`  : styles['main-button']}>{value}</button>
                                ))
                            }
                        </div>)}
        { filteredContent && (
            filteredContent.map( ( item, index ) => 
                <div onClick = {() => redirect(item.href)} key = {index}>
                    <div className = {styles["big-cards__card"]}>
                        <div className = {`${styles["big-cards__img"]} ${imgFitContain && styles['big-cards__img_partners']}`}>
                            <img src={item.smallImg} alt="" />
                        </div>
                        <div className = {styles["big-cards__description"]}>
                            <h3>{item.title}</h3>
                            {item.description.map( (p, index) => <p key = {index}>{p}</p>)}
                            {item.contacts && (
                                <p>                                  
                                {item.contacts.tel && (<>Контакты<br />т. <a href={`tel:${item.contacts.tel}`}>{item.contacts.tel}</a></>)}
                                {item.contacts.email && (<><br />e-mail: <a href={`mailto:${item.contacts.email}`}>{item.contacts.email}</a></>)}
                                {item.contacts.site && (<><br /><a href={`${item.contacts.site}`}>{item.contacts.site}</a></>)}
                                {item.contacts.wa && (<><a href={`https://wa.me/${item.contacts.wa}`}>{'whatsapp: '+item.contacts.wa}</a></>)}
                                {item.contacts.address && (<><br />{`${item.contacts.address}`}</>)}
                                {item.files && item.files.map( (file, index) => (<a className = {styles['big-cards__filelink']} key = {index} href={`${file.src}`} style={{textDecoration: "underline"}} >{file.name}</a>))}
                                </p>
                            )
                            }  

                            <div className={styles["big-cards__info"]}>
                                <div className={styles["big-cards__cost"]}>
                                    <span>{item.price}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            )
        }
    </div>
  )
}

export default BigCards