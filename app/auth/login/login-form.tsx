'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from '@/components/buttons/card-wrapper'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,  } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button} from '@/components/ui/button'
import FormError from '@/components/forms/form-error'
import FormSuccess from '@/components/forms/form-success'
import { LoginSchema } from '@/schemas'

import { FaSearch } from 'react-icons/fa'
import { login } from '@/app/(actions)/login'

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.Infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      login(values)
      .then((data) => {
        setError(data.error!)
        setSuccess(data.success!)
        if(success) {
            
          // Save token to the cookies and localStorage
        }
      })
    },)    
  }

  return (
    <div className=' items-center justify-center flex flex-col shadow-md'>      
        <CardWrapper
            headerLabel='Welcome Back'
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account ?"
            showSocial
        >
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 '
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative space-x-2 flex items-center">
                            <FaSearch className='absolute left-3 h-4 w-4 text-muted-foreground'/>
                            <Input
                            className='pl-10'
                            {...field}
                            placeholder='youremail@example.com'
                            type='email'
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
                    name='password'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Your Password min. 6 Characters'
                            type='password'
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
                  className='w-full' 
                  disabled={isPending}              
                >
                  Login
                </Button>
            </form>
          </Form>
        </CardWrapper>              
    </div>
  )
}

export default LoginForm