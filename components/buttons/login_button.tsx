'use client'
import { useRouter } from "next/navigation";
import { ReactNode } from "react"
import React from 'react'

interface LoginButtonProps {
    children: ReactNode;
    mode?: "modal" | "redirect"
    asChild?: boolean;
}


const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {
    const routes = useRouter()
    const onClick = () => {
        routes.push("/auth/login")
    }

  return (
    <div className="">
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    </div>
  )
}

export default LoginButton