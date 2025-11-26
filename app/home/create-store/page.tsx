import { addStore } from '@/actionszod/addStore'
import ContentWrapper from '@/components/buttons/content-wrapper'
import FormError from '@/components/forms/form-error'
import FormSuccess from '@/components/forms/form-success'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddStore } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
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
    <div className=' items-center justify-center flex flex-col shadow-md'>      
    <ContentWrapper
        headerLabel='Create Class'
        title='Create Class'
        backButtonHref='/home/class'
        backButtonLabel='Back to home'
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 '
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <div className="relative space-x-2 flex items-center">                          
                        <Input
                        className='pl-10'
                        {...field}
                        placeholder='Ex: SMA X IPA 5'
                        type='text'
                        disabled={isPending}                            
                      />
                      </div>                          
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your class description'
                        type='text'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>                      
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Your Store Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Ex: SMAN 5 Depok'
                        type='text'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>                      
                  </FormItem>
                )}
              />
            </div>
            <FormError
              message={error}
            />
            <FormSuccess
              message={success}
            />
            <Button
              type='submit'
              className='w-full bg-green-700 text-amber-50 cursor-pointer hover:bg-green-300 hover:text-blue-950' 
              disabled={isPending}
            >
              <FaPlus/> Create
            </Button>
        </form>
      </Form>
    </ContentWrapper>  
  </div>
  )
}

export default CreateStorePage