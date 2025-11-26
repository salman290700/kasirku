// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Login } from '../(api)/login' 

// export type loginToken = {
//   email: string,
//   email_verified: boolean,
//   family_name: string,
//   given_name: string,
//   name: string
//   picture: string,
//   sub: string
// }

// interface LoginProps {
//   isRouting: boolean,
//   routing: string
// }

// export const getParams = async() => {  
//   const router = useRouter()
//   const base64urlDecode = (str: string) => {
//     return Buffer.from(str, 'base64').toString();
//   };
//   // const token = params.access_token
//   const [hash, setHash] = useState('');
//   useEffect(() => {
//     // Check if window is defined (to ensure client-side execution)
//     if (typeof window !== 'undefined') {
//       setHash(window.location.hash);

//       // You can also listen for hash changes
//       const handleHashChange = () => {
//         setHash(window.location.hash);
//       };

//       window.addEventListener('hashchange', handleHashChange);    
//       return () => {
//         window.removeEventListener('hashchange', handleHashChange);
//       };
//     }
//   }, []);
//   if (hash !== null || hash !== "")   {
//     console.log({hash: hash})
//     const hashSplit = hash.split("#")[1];
//     const parsedHash = new URLSearchParams(hashSplit);
//     const access_token = parsedHash.get("access_token")
//     console.log({access_token: access_token})
//     const user_profile = base64urlDecode(access_token !== null ? access_token : "")
//     console.log({userProfile: {
//       user_profile
//     }})

//     if (access_token !== null ) {
//       const response = await Login(access_token)
//       console.log(await response)
//       if (response !== null) {        
//         router.push("/home")
//       }else {
//         router.push("/auth/login")
//       }    
//     }
//   }               
// }
// const Afterlogin = () => {   
//   getParams()
//   return (
//     <div className="">      
//       Loading...      
//     </div>
//   )
// }

// export default Afterlogin
