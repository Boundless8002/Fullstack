import React, { useState } from 'react'
import logo from "../assest/logoreg.jpg"
import { Link, Navigate } from 'react-router-dom'
import {FaUserCircle} from "react-icons/fa"
import {BsCartFill} from "react-icons/bs"
import Login from '../page/Login'
import Newproduct from '../page/Newproduct'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'

function Header() {
  const [showMenu,setShowMenu]=useState(false);
  
  const userData=useSelector((state)=>state.user)
 // console.log(userData)
  const dispatch=useDispatch();

  const handleShowMenu=()=>{
    setShowMenu(prev=>!prev)
  }
  const handleLogout=()=>{
  dispatch(logoutRedux())
  toast("Logout successfully")
  }
  //console.log(process.env.REACT_APP_ADMIN_EMAIL)
 const cartItemNumber=useSelector((state=>state.product.cartItem))
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* laptop */}

     <div className="flex items-center h-full justify-between">
    <Link to ={""}>
    <div className="h-16">
        <img src={logo} className="h-full"/>
    </div>
    </Link>
    <div className="flex items-center gap-4">
      <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
        <Link to={""}>Home</Link>
        <Link to={"menu/6453432c831d6589b9c8355c"}>Menu</Link>
        <Link to={"about"}>About</Link>
        <Link to={"contact"}>Contact</Link>
      </nav>
      <div className="text-2xl text-slate-600 relative">
       <Link to={"cart"}><BsCartFill/>
        <div className="absolute -top-3 -right-2 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center">{cartItemNumber.length}</div></Link> 
      </div>
      <div className=" text-slate-600 " onClick={handleShowMenu} >
        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md" >
        {userData.image ? <img src={userData.image} className="h-full w-full"/> : <FaUserCircle/> }
          
        </div>
        {
          showMenu && (<div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
            {
              (userData.email=== process.env.REACT_APP_ADMIN_EMAIL) && <Link to={"newproduct"} className="whitespace nowrap cursor-pointer" >New Product</Link>
            }
        
         {/* <Link to={"newproduct"} className="whitespace nowrap cursor-pointer" >New Product</Link> */}
          {
            userData.image || userData.email  ? <p className="cursor-pointer text-white bg-blue-500" onClick={handleLogout}>Logout  ({userData.firstName +" " + userData.lastName})</p> :<Link to={"login"} className="whitespace nowrap cursor-pointer">Login</Link>
          }
          <nav className="text-base md:text-lg flex flex-col md:hidden">
        <Link to={""} className="px-2 py-1">Home</Link>
        <Link to={"menu/6453432c831d6589b9c8355c"} className="px-2 py-1">Menu</Link>
        <Link to={"about"} className="px-2 py-1">About</Link>
        <Link to={"contact"} className="px-2 py-1">Contact</Link>
      </nav>
           </div>
        )}
      
      </div>
    </div>
</div>

{/* mobile */}
    </header>
  )
}

export default Header
