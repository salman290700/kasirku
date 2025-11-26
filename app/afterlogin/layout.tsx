import React, { ReactNode } from 'react'

const AdterLoginLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>{children}</div>
  )
}

export default AdterLoginLayout