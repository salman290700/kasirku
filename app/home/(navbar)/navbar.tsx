'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaArrowLeft, FaBars, FaEdit, FaHome } from 'react-icons/fa'
import {PiStudent} from 'react-icons/pi'
import { BsPersonVideo, BsPersonVideo2, BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineScience } from "react-icons/md";

const Navbar = () => {
  const [chooseMenu, setChooseMenu ] = useState('')
  const [menuClick, setMenuClick] = useState(false)
  const router = useRouter()
  const handleNav = () => {
    setMenuClick(!menuClick)
    console.log(menuClick)
  }

  const goToClasses = () => {
    setChooseMenu('classes')
    router.push("/home/class")
  }

  const goToHome = () => {
    setChooseMenu('home')
    router.push("/home")
  }

  const goToSubject = () => {
    setChooseMenu('subjects')
    router.push("/home/subjects")
  }

  const goToStudent = () => {
    setChooseMenu('students')
    router.push("/home/students")
  } 
  return (
    <nav className='fixed w-full h-12 shadow-xl top-0'>
      <div className="flex justify-between items-center h-full w-full">
        <div className="mx-4 2xl:mx-16">
          <FaBars onClick={() => {handleNav()}} size={24}/>
        </div>
        <div className="text-xl cursor-pointer mx-4 2xl:mx-16" onClick={() => {
          router.push("/home")
        }}>Apix App</div>

               
        {/* <div className="">
          <ul className="hidden sm:flex" >
            <Link href={'/home'}>
              <li className='ml-10 uppercase hover:border-b text-xl'>Why Us</li>
            </Link>
            <Link href={'/home'}>
              <li className='ml-10 uppercase hover:border-b text-xl'>Why Us</li>
            </Link>            
            <Link href={'/home'}>
              <li className='ml-10 uppercase hover:border-b text-xl'>Why Us</li>
            </Link>            
            <Link href={'/home'}>
              <li className='ml-10 uppercase hover:border-b text-xl'>Why Us</li>
            </Link>                        
          </ul>
        </div> */}
        {/* Mobile List */}
        
      </div>

      <div className={
        menuClick 
        ? "fixed left-0 top-0 w-[65%] sm:w-[25%] h-screen bg-blue-950 p-10 duration-500 transform transition hover:border-b-2"
        : "fixed left-[100%] top-0 my-10 duration-500 transform transition"
      }>
        <div className="flex justify-between items-center">
          <p className='text-3xl'>
            Apix App
          </p>
          <FaArrowLeft
            onClick={() => {
              handleNav()
            }}
          />
        </div>
        <ul className='flex mt-3 flex-col space-x-3 w-full'>
          <li className={chooseMenu === 'home' 
            ? 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center bg-amber-50 text-black'
            : 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center'} onClick={() => {goToHome()}}><FaHome className='mx-2'/>Home</li>          
          <li className={chooseMenu === 'classes' 
            ? 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center bg-amber-50 text-black'
            : 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center'} onClick={() => {goToClasses()}}><BsPersonVideo2 className='mx-2'/>Classes</li>
          <li className={chooseMenu === 'subjects' 
            ? 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center bg-amber-50 text-black'
            : 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center'} onClick={() => {goToSubject()}}><MdOutlineScience className='mx-2'/>Subject</li>
          <li className={chooseMenu === 'students' 
            ? 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center bg-amber-50 text-black'
            : 'text-2xl hover:bg-indigo-500 w-full p-2 duration-300 transition flex items-center'}
            onClick={() => {goToStudent()}}
            ><PiStudent className='mx-2'/>Student</li>        
        </ul>
      </div>
    </nav>
  )
}

export default Navbar