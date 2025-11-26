"use client"
import BackButton from '@/components/buttons/back-button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React, { ReactNode } from 'react'

interface CardWrapperProps {
    children?: ReactNode;
    headerLabel: string;
    title: string,
    backButtonLabel?: string;
    backButtonHref?: string
    showSocial?: boolean
}

const ContentWrapper = ({
    children,
    headerLabel,
    title,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
  return (
    <Card className='md:w-full shadow-md'>
        <CardHeader className='flex flex-col items-center'>
            <h1 className="md:text-2xl text-shadow-2xs">{title}</h1>                        
        </CardHeader>
        <CardContent className=''>
            {children}
        </CardContent>        
        <CardFooter>
            {backButtonHref && backButtonLabel ? (
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}   
                >                    
                </BackButton>
                ) : (<></>)}  
        </CardFooter>
    </Card>
  )
}

export default ContentWrapper