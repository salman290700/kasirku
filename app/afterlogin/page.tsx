'use client'
import { useEffect, useState } from 'react'
import { Login } from '../(api)/login'
import { useRouter, useSearchParams } from 'next/navigation'

const getParams = () => {

}

const getHash = () => typeof window !== 'undefined' ? window.location.hash : "";
const AfterLoginPage = () => {
  const router = useRouter()
  const [hash, setHash] = useState<string>(getHash());
   useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);
    }

    async function getParams() {
      if (hash !== null || hash !== "")   {
        console.log({hash: hash})
        const hashSplit = hash.split("#")[1];
        const parsedHash = new URLSearchParams(hashSplit);
        const access_token = parsedHash.get("access_token")
        console.log({access_token: access_token})
        if (access_token !== null ) {
          const response = await Login(access_token)
          console.log(response)
          if (response !== null) {              
            router.push("/home")
          }else {
            router.push("/auth/login")
          }    
        }
      }  
    }
    getParams()
  }, []);  
  return (
    <div>
      Loading...
    </div>
    // <div className=""><Afterlogin/></div>
  )
}

export default AfterLoginPage