import { userReq, UserRes } from "@/types/types"
import axios from "axios"
import Cookies from "js-cookie"
type Message = {
  token: string
}

export async function Login(token: string): Promise<boolean> {  
  
  const message: Message = {
    token: token
  }

  const server_link = "http://localhost:3000/api/user"
  console.log(message.token)
  console.log(message)
  
  const response = await axios.post(server_link, message)

  const dataRes = await response.data as userReq
  console.log("dataRes", dataRes)
  const dataResponse: UserRes = {    
    family_name: dataRes.family_name,
    given_name: dataRes.given_name,
    name: dataRes.name,
    picture: dataRes.picture,
    token: dataRes.token,
  }
  localStorage.setItem("image", dataResponse.picture)
  localStorage.setItem("family_name", dataResponse.family_name)
  localStorage.setItem("given_name", dataResponse.given_name)
  localStorage.setItem("name", dataResponse.name)
  localStorage.setItem("token", dataResponse.token);
  console.log(dataResponse.token)
  Cookies.set("token", dataResponse.token)
  console.log(Cookies.get("token"))
  console.log(JSON.stringify(dataResponse))  
  const tokenStore = localStorage.getItem("token")
  console.log(tokenStore)
  if (dataRes.token === null || dataRes.token === 'undefined')  {
    return false
  }
  return true
}

