import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
interface ButtonMovePageProps {
  children: ReactNode,
  link: string
}
const ButtonMovePage = ({children, link}: ButtonMovePageProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push(link)
  }  
  return (
    <div className="">
      <span className="cursor-pointer" onClick={() => onClick() }>
        {children}
      </span>
    </div>
  )
}

export default ButtonMovePage