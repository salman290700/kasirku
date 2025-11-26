"use server";

import z, { string } from "zod";
import { LoginSchema } from "@/schemas";
import { putToLocalStorage } from "@/lib/utilities";

export const login = async(data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)
    
  if(!validatedFields) {
    return{ error: "Invalid Fields"}
  }
  const token = putToLocalStorage("refresh", "true")
  console.log(token)
  console.log({dataLogin: data})  
  try {
    // Fetch to server
    // Get the JWT Token
        
  } catch(error) {
    throw error;
  }
  return { success: "Email Sent"}
};
