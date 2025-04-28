'use client'

import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import styles from './BigCards.module.scss'
import Link from 'next/link'
// import { useLocation, useNavigate } from 'react-router-dom'


const BigCards = (props) => {
    const { content,  sections = new Map(), imgFitContain } = props
    const [filteredContent, setFilteredContent] = useState(content)
    const [activeSection, setActiveSection] = useState('')


    useEffect( () => {
        sections && setFilteredContent(content.filter( (item) => activeSection.includes(item.section)))                
    }, [activeSection])


    const handleSectionButton = (section) => 
        // (activeSections.includes(section)) ? setActiveSections(activeSections.filter( item => item !== section))
        //     : setActiveSections([...activeSections, section])
        setActiveSection(section)


  return (
    <div className = {styles["big-cards"]}>
        {sections && (
                        <div className= {styles['big-cards__sections']}>
                            {sections.forEach((key, value) => (
                                <button  key={key} onClick={() => handleSectionButton(key)} className = {activeSection.includes(key) ? 'active main-button' : 'main-button'}>{value}</button>
                            )
                                )
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
                                {/* {(item.varPrice !== "") && (
                                    <div className='big-cards__cost'>
                                        <span>{item.varPrice}</span>
                                        <span>{item.varTime}</span>
                                    </div>
                                )} */}


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