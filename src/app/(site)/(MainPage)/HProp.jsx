'use client'
import React, { useContext, useEffect } from 'react'
import HeaderContext, { HContext } from '../Components/Header/HeaderProvider'

const HProp = (props) => {
  console.log('hprop rendered')

    const {bgColor} = props
    const {pageClass, setPc} = HContext()

    useEffect( () => {
        setPc(bgColor)
    }, [])

  return (
    <><input type="text" onChange={(e) => setPc(e.target.value)} value={pageClass}/></>
  )
}

export default HProp