import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from '../appwrite/auth'
import {toast} from 'react-toastify'

function Signup() {

      const [email,setEmail] =useState('')
      const [password,setPassword] =useState('')

      const handleSignup =async(e)=>{
        e.preventDefault()
        try {
          const user = await authService.createUser({email,password})
          console.log(user);
          if(user && user?.$id){
            setEmail('')
            setPassword('')
            return toast.success('Account created successfully! Please login')
          }
          toast.error('something went wrong!')
          
        } catch (error) {          
          toast.error(error.message)

          
        }

      }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>
        <form onSubmit={handleSignup} >
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
            Create Account
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
