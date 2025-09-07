import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import authService from '../appwrite/auth'
import {toast} from 'react-toastify'
import {login as loginReducer} from '../redux/authSlice'
import { useDispatch } from "react-redux";


function Login() {

      const [email,setEmail] =useState('')
      const [password,setPassword] =useState('')
      const navigate  = useNavigate()
     const dispatch =  useDispatch()

      const handleLogin =async(e)=>{
        e.preventDefault()
        try {
          const session = await authService.loginUser({email,password})
          // console.log(session);
          if(session && session?.$id){
            setEmail('')
            setPassword('')
            const userData = await authService.getCurrentUser()
            if(userData && userData?.$id){
            const payload ={
              userData :userData
            }
            dispatch(loginReducer(payload))
            navigate ('/')//Link and useNavigate diffrnec is that useNavigate  ddoesnt reqyire click like Link , we can progamrticlaly naviagte user to some route
            return toast.success('Login Successful!')
          }
          }
          toast.error('something went wrong!')
          
        } catch (error) {          
          toast.error(error.message)

          
        }

      }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
        <form onSubmit={handleLogin} >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We’ll never share your email with anyone else.
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}

            />
          </div>


          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold shadow"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none text-primary fw-bold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
