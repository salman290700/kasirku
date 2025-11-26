import axios from "axios"
import { dataToken } from "@/types/types"

export async function getUser(token: string) {
  const userReq: dataToken = {
    token: token
  }
  const link = "http://localhost:5112/user"
  const response  = await axios.post(link, userReq)
  return response
}