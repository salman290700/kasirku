export interface IDBSettings {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string 
}

export const GetDBSettings = (): IDBSettings => {
  const env = process.env.NODE_ENV

  if (env === 'development') {
    return {
      host: process.env.DATABASE_HOST!, 
      port: parseInt(process.env.DATABASE_USER!),
      user: process.env.DATABASE_PASSWORD!,
      password: process. env.DATABASE_PASSWORD!,
      database: process. env.DATABASE_NAME!,
    }} else {
      return {
      host: process.env.DATABASE_HOST!, 
      port: parseInt(process.env.DATABASE_USER!),
      user: process.env.DATABASE_PASSWORD!,
      password: process. env.DATABASE_PASSWORD!,
      database: process. env.DATABASE_NAME!,
    }}
}