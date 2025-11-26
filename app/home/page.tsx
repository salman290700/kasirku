import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const HomePage = async() => {
  const cookie = await cookies()
  const token = cookie.get("token")
  console.log(token)
  return (
    <div className="">
      <Button
        variant={"default"}
        onClick={() => {
          redirect("/create-store")
        }}
      >
        Create store
      </Button>
    </div>
  )
}

export default HomePage