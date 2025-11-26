import React, { ReactNode } from 'react'
import Navbar from './(navbar)/navbar'

const HomeLayout = ({children}: {children: ReactNode}) => {
  return (          
      <div className="w-full h-full items-center justify-center flex flex-col">
        <Navbar/>
        <div className="2xl:mt-16 mt-4">
          {children}
        </div>      
      </div>                                  
  )
}

export default HomeLayout