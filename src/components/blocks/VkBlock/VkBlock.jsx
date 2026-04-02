'use client'

import { useEffect, useState } from 'react'
import styles from './VkBlock.module.scss'


const VkBlock = () => {
    useEffect ( () => {
        const VK = window.VK
        VK.init({
            apiId: 51631581
        });    
        VK.Widgets.Group("vk_groups", {mode: 4, width: 'auto', height: "800", color3: "4d95be", no_cover: 0}, 219297445)   
    }, [])

    

  return (
        <div className={`${styles['vk-container']} container`}>
                <h2>Наши новости</h2>
                <div id="vk_groups"></div>
        </div>
  )
}

export default VkBlock