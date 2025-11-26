import React from 'react'

interface headerProps {
    label: string
}
const Header = ({label}: headerProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
        <h1 className="text-3xl font-semibold">
            AUTH
        </h1>
        <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default Header