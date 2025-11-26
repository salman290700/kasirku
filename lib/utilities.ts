'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
}

export const putToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.setItem(key, value)
}

export const getState = () => {
  const base64urlDecode = (str: string) => {
    return Buffer.from(str, 'base64').toString();
  };
  // const token = params.access_token    
  const [hash, setHash] = useState('');
  useEffect(() => {
    // Check if window is defined (to ensure client-side execution)
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);

      // You can also listen for hash changes
      const handleHashChange = () => {
        setHash(window.location.hash);
      };

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, []);
  if (hash !== null || hash !== "")   {
    console.log({hash: hash})
    const hashSplit = hash.split("#")[1];
    const parsedHash = new URLSearchParams(hashSplit);
    const access_token = parsedHash.get("access_token")
    // const refresh = parsedHash.get("refresh")
    
    const token = putToLocalStorage("token", access_token? access_token : "")
    console.log({access_token: access_token})
    const user_profile = base64urlDecode(access_token !== null ? access_token : "")
    console.log({userProfile: {
      user_profile
    }})

    if (access_token !== null ) {
      const linkTokenProfile = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + access_token
    
      console.log("link to profile", linkTokenProfile)
      console.log(access_token)      
      axios.get(linkTokenProfile)
      .then((response) => {
        console.log({response})
        return access_token        
      })
      .catch(error => {
        console.log(error)
        return null
      })
      // Fecth token to the server  
    }
  }
}