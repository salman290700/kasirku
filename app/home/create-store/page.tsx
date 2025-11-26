import { addStore } from '@/actionszod/addStore'
import { AddStore } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const CreateStorePage = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.Infer<typeof AddStore>>({
    resolver: zodResolver(AddStore),
    defaultValues: {
      name: "",
      description: "",
      address: ""
    }
  })    
  const onSubmit = (values: z.infer<typeof AddStore>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      addStore(values)
      .then((data) => {
        setError(data.error!)
        setSuccess(data.success!)
        if(success !== undefined) {
          router.push("/home/class")
          // Save token to the cookies and localStorage
        }
      })
    },) 
  }
  return (
    <div>CreateStorePage</div>
  )
}

export default CreateStorePage