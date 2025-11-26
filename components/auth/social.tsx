'use client'
import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { redirect, useRouter } from 'next/navigation'

const Social = () => {
    const {theme} = useTheme()    
    const router = useRouter()
    const onSubmitServerGoogle = async () => {
        router.push("https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly%20https%3A//www.googleapis.com/auth/userinfo.profile%20https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=%2Fprofile&redirect_uri=http://localhost:3000&client_id=1054445037252-km49vrvf6m78fqkn9snt5rl123u7e7v5.apps.googleusercontent.com")    
        console.log("dsadsa")
    }
    return (
    <div className="flex items-center justify-center w-full space-x-2">
        <Button
            size="lg"
            className={theme === "dark" ? "w-1/2 shadow-2xl shadow-white" : "w-1/2 shadow-md"}
            variant="outline"
            onClick={() => {onSubmitServerGoogle()}}
        >
            <FcGoogle className='h-5 w-5'/>
        </Button>

        <Button
            size="lg"
            className={theme === "dark" ? "w-1/2 shadow-2xl shadow-white" : "w-1/2 shadow-md"}
            variant="outline"
            onClick={() => {}}
        >
            <FaGithub className='h-5 w-5'/>
        </Button>
    </div>
    )
}

export default Social