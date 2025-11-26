import { cookies } from "next/headers"

const HomePage = async() => {
  const cookie = await cookies()
  const token = cookie.get("token")
  console.log(token)
  return (
    <div>HomePage</div>
  )
}

export default HomePage