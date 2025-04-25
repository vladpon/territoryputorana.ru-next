'use client'


import React, { createContext, useContext, useState } from 'react'

// type HeaderClassType = {
//     pageClass: string,
//     setPc: (arg0: string) => void
// }

const defaultValue = {
  pageClass: '',
  setPc: () => false
}


export const HeaderContext = createContext(defaultValue);
export const HContext = () => useContext(HeaderContext)


const HeaderProvider = ({children}) => {
  const [pc, setPc] = useState('#123')
  return (
    <HeaderContext.Provider value = {{pageClass: pc, setPc: setPc}}>
        {children}
    </HeaderContext.Provider>
  )
}

// export const useHeaderClass = () => useContext(HeaderContext)

export default HeaderProvider