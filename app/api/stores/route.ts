import PoolingConnex from "@/db/DbConnection"
import { Employee, Store, StoreReq, User, UserRes } from "@/types/types"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ResultSetHeader } from "mysql2"

export async function POST(req: Request) {
  // JWT Verify
  const connex = await PoolingConnex.getConnection()
  const token = req.headers.get("Authorization")?.split(' ')[1]
  console.log({"token": token})
  if (token === undefined || token === null) {
    return Response.json({error: "Unauthorized"}, {status: 401})
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  const subject = decoded.subject
  // Get User from id in JWT
  const getUserQuery = await connex.query(`SELECT * FROM users WHERE id = ${subject}`)
  const users = getUserQuery[0] as User[]
  if (users.length <= 0) {
    return Response.json({status: 404})
  }
  const user = users[0] as User
  // Update user to admin 
  const userUpdateQue = await connex.query(`UPDATE users SET role_id = 2  where id = ${user.id}`)
  const userUpdate = userUpdateQue[0] as ResultSetHeader
  const success = userUpdate.warningStatus
  if (success >= 1) {
    return Response.json({status: 404})
  }
  // Create Stores
  const stores = await req.json() as StoreReq
  const DbQuery = await connex.query(`INSERT INTO stores (name, description) VALUES ('${stores.name}', '${stores.description}')`)
  const storeId = DbQuery[0] as ResultSetHeader
  const store: Store = {
    id: storeId.insertId,
    name: stores.name,
    description: stores.description
  }

  // Check employee based on user_id
  const employeesQuery = await connex.query(`SELECT id, email FROM employees WHERE user_id = '${user.id}`)
  const employees = employeesQuery[0] as Employee[] 
  const employee = employees[0] as Employee
  // Create employee as executive 
  if (employees.length <= 0) {
    const createEmployee = await connex.query(`INSERT INTO employees (email, name, rating, department_id, user_id, store_id) VALUES ('${user.email}', '${user.name}', 5.0, 1, ${user.id}, ${store.id})`) 
    const createEmpResHeader = createEmployee[0] as ResultSetHeader
    const empId = createEmpResHeader.insertId
    employee.id = empId    
  } 
  // create employees_stores relation
  // const empStoresque = await connex.query(`INSERT INTO employees_users (employee_id, store_id) values (${employee.id}, ${store.id})`)
  // return response success or error
  return Response.json({store: {store}}, {status: 200})  
}

export async function GET(req:Request) {
  // Jwt Verify
  const connex = await PoolingConnex.getConnection()
  const token = req.headers.get("Authorization")?.split(' ')[1]
  console.log({"token": token})
  if (token === undefined || token === null) {
    return Response.json({error: "Unauthorized"}, {status: 401})
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  const subject = decoded.subject
  // Get EMP by userId or subject
  try {
    const getEmps = await connex.query(`SELECT * FROM employees where user_id = ${subject}`)
    const emps = getEmps[0] as Employee[]
    const employee = emps[0] as Employee
    if (emps.length <= 0) {
      return Response.json({status: 404})
    }

    const getStores = await connex.query(`SELECT * FROM stores WHERE store_id = ${employee.store_id}`)
    const stores = getStores[0] as Store[]
    const store = stores[0] as Store
    return Response.json({store})

  } catch (err) {
    console.log(err) 
    return Response.json({status: 500})
  }
  
  // const empId = decoded.employee_id
  
  // const role = decoded.role
  // Get stores that is joined with empId in employees_stores
  
  // Get Stores based on id in employees_stores
}

export async function UPDATE(req: Request) {
  const connex = await PoolingConnex.getConnection()
  const request = await req.json() as StoreReq

  const updateStore = await connex.query(`UPDATE stores SET name = '${request.name}', description = '${request.description}'`)
  const statusCheck = updateStore[0] as ResultSetHeader
  const status = statusCheck.warningStatus
  if (status >= 1) {
    return Response.json({status: 500})
  }
  return Response.json({status: 200})
}