import axios from "axios";
import jwt, { sign } from 'jsonwebtoken';

import { randomUUID } from "crypto";
import PoolingConnex from "@/db/DbConnection";
import { Employee, getById, Token, User, UserPayloadToken, userReq } from "@/types/types";
import { UserRes } from "../../../types/types";
import { ResultSetHeader } from "mysql2";
import { getUser } from "@/app/(actions)/user";

export async function POST(
  // req: Request,
  req: Request
) {
  const message = await req.json() as Token
  console.log({"googleToken": message.token})
  const token = message.token
  const linkTokenProfile = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
  // Check to the database if user exists  
  try {
    const connex = await PoolingConnex.getConnection();
    const res = await axios.post(linkTokenProfile)
    const response = res.data as userReq
    const getUserss = await connex.query(`SELECT id FROM users WHERE email='${response.email}'`)
    const getUSers = getUserss[0] as getById[]
    // const getUser = getUSers[0] as getById
    // if (results.length > 1) {
    //   return Response.json({error: "Register First"})
    // }
    console.log(response)    
    const returnResponse = {  
      email: response!.email!,
      family_name: response.family_name,
      given_name: response.given_name,
      name: response.name,
      picture: response.picture,
      token: "dsadsaerqrewrwedsadas",
    }

    const user = {
      email: returnResponse!.email,
      name: returnResponse!.name,
      created_at: new Date()
    }

    console.log(user)
    if (getUSers.length <= 0) {
      // check if password is correct      
      await connex.query(`INSERT INTO users(email, name, role_id) VALUES ('${user.email}', '${user.name}', 1)`,[])      
      // const resheader = result[0] as ResultSetHeader      
    }
    const results = await connex.query(`SELECT * FROM users where email='${user.email}'`,[])
    const userResults = results[0] as User[]
    console.log(userResults)
      if (userResults.length <= 0) {
        console.log(userResults)
        return Response.json({error: "NO data"})
      }

      const responsesDb = results[0] as UserPayloadToken[]
      console.log(responsesDb)
      const returnResponseUser = responsesDb[0] as UserPayloadToken
      const payload = {
      subject: returnResponseUser.id!,
      role: returnResponseUser.role!,
      employee_id: 0,
      name: user.name,
      }
      console.log(payload)
      console.log(payload.subject)
      const secret = process.env.JWT_SECRET!
      const jwtToken = jwt.sign(payload, secret, {expiresIn: '100h'});
      console.log(jwtToken)

      const responseUser: UserRes = {
        family_name: response.family_name,
        given_name: response.given_name,
        name: response.name,
        picture: response.picture,
        token: jwtToken.toString(),
        // stores_id: []
      }
      console.log(responseUser)
      return Response.json(responseUser, {status:200})
  }
  catch(error) {
    return Response.json({status: 404})
  }
}

// export async function GET() {
//   let connex = await PoolingConnex.getConnection()
//   const results = await connex.query(`SELECT * FROM USERS WHERE email='salman.10118389@mahasiswa.unikom.ac.id'`)
//   const user = results[0] as 
//   if(user !== null || user !== undefined) {
//     return Response.json(user)
//   }
//   return Response.json({error: "Error happenned in user file"})
// }

