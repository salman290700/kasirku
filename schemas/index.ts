import z, { string } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password required"
  })
})

export const SearchSchema = z.object({  
  search: z.string().min(1, {
    message: "type a word to search"
  })
})

export const AddStore = z.object({
  name: z.string().min(1, {
    message: "Insert your store name"
  }),
  description: z.string(),
  address: z.string()
})

export const AddItem = z.object({
  name: z.string().min(1, {
    message: "Input your Item name"
  }),
  description: z.string(),
  stock: z.number()
})

export const ClassSchema = z.object({
  name: z.string().min(1, {
    message: "Name Required"
  }),
  description: z.string(),
  school: z.string()
})

export const EditClassSchema = z.object({
  id: z.number(),
  id_school: z.number(),
  name: z.string().min(1, {
    message: "Name Required"
  }),
  description: z.string(),
  school: z.string()
})

export const AddStudentSchema = z.object({
  idClass: z.number().min(1, 
    {message: "ID is requried"}
  ),
  name: z.string().min(1, {
    message: "Name Required"
  }),
  description: z.string(),  
})

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must at least 6 Characters"
  })
})

export type Student = {
  id: string,
  name: string,
}

export type Grade = {
  id: string,
  student: string,
  grade: number,
  class: string
}
