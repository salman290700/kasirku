"use server"
import { AddStore, ClassSchema } from "@/schemas"
import axios from "axios"
import { error } from "console"
import { cookies } from "next/headers"
import z, { success } from "zod"

export const addStore = async(data: z.infer<typeof AddStore>) => {  
  const validatedFields = ClassSchema.safeParse(data)

  if(!validatedFields) {
    return {error: "Invalid Fields"}
  }
  const token = (await cookies()).get("token")?.value
  console.log(token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    await axios.post("http://localhost:3000/api/add-store",data, config).then(() => {
      return { success: "Store has been Created"}
    })
    .catch((error) => {
      throw error
    })
    
  } catch(error) {
    throw error
  } finally {
    return { success: "Store has been Created"}  
  }  
}