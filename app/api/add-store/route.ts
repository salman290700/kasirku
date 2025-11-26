import PoolingConnex from "@/db/DbConnection"
import { StoreReq } from "@/types/types"
import { error } from "console"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ResultSetHeader } from "mysql2"

export async function POST(req:Request) {
  const connex = await PoolingConnex.getConnection()
  const token = req.headers.get("Authorization")?.split(' ')[1]
  console.log({"token": token})
  if (token === undefined || token === null) {
    return Response.json({error: "Unauthorized"}, {status: 401})
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  const subject = decoded.subject
  
  const storeReq = await req.json() as StoreReq

  const saveStore = await connex.query(`INSERT INTO stores (name, description, address) VALUES ('${storeReq.name}', '${storeReq.description}', '${storeReq.address}')`)
  const status = saveStore[0] as ResultSetHeader
  if (status.warningStatus >=0) {
    return Response.json({error: "error in server"}, {status: 500})
  }else{
    return Response.json({status: 200})
  }
}