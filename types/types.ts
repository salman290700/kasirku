export type userReq = {
  email: string,
  email_verified: boolean,
  family_name: string,
  given_name: string,
  name: string
  picture: string,
  token: string
}

export type UserRes = {  
  family_name: string,
  given_name: string,
  name: string
  picture: string,  
  token: string,
}

export type dataToken = {
  token: string,
}

export type User = {  
  id: number,
  email: string,
  name: string,
  role_id: number
}

export type Token = {
  token: string
}

export type UserPayloadToken = {
  id: string
  role: string
}

export type UserToken = {
  token: string
}

export type getById = {
  id: string
}

export type getByIdNumber = {
  id: number
}

export type Store = {
  id: number,
  name: string,
  description: string,  
}

export type StoreReq = {  
  name: string,
  description?: string,  
  address?: string,  
}

export type Item = {
  id: number,
  store_id: number,
  name: string,
  description: string
  price: number,
  profit: number,
  profit_percentage: number
}

export type Order = {
  id: number,
  store_id: number,  
  total_price: number;
  status: string,
  date: Date,
}

export type OrderItems = {
  id: number,
  item_id: number,
  quantity: number,
  price: number
}

export type OrderRes = {
  order: Order,
  order_items: OrderItems[]
}

export type LiveSales = {
  id: number,
  store_id: number,
  sales: number,
  total_price: number,
  profit: number
  date: Date
}

export type FinReportReq = {  
  date_from: Date,
  date_to: Date
}

export type Employee = {
  id: number,
  email: string,
  name: string,
  rating: number,  
  department_id: number,
  user_id: number,
  store_id: number
}