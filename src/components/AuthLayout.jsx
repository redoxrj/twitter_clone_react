import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Loader from './Loader'
function AuthLayout() { 
    // children is nothing but components within this auth Protection that we need to check/authrncticate/pass

    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{

        if(isLoggedIn===false){
             navigate("/login", { replace: true });
        }

        setLoading(false)

    },[isLoggedIn,navigate])

  if(loading){
    return <Loader />;
  }

  return <Outlet />;

  
}

export default AuthLayout
