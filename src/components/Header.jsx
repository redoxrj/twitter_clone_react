import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { toast } from 'react-toastify'
import {logout as logoutReducer} from '../redux/authSlice'


function Header() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const navItems =[
        {
            name : 'Home',
            path : '/',
            visibility :"common"
        },
        {
            name : 'Login',
            path : '/login',
            visibility :"logout"

        },
        {
            name : 'Signup',
            path : '/signup',
            visibility :"logout"

        },
        {
            name : 'MyPosts',
            path : '/my_posts',
            visibility :"login"

        },
        {
            name : 'CreatePost',
            path : '/create_post',
            visibility :"login"

        }
        
    ]

    const [showModal,setShowModal] =useState(false)

    const handleLogout = async()=>{
      try {
        const result = await authService.logoutUser()
        if(result){
          dispatch(logoutReducer())
          toast.success('LoggedOut Successfully!')
          navigate('/')
        }
        
      } catch (error) {
        toast.error(error.message)
        
      }
      
    }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src="twitter.png" alt="Logo" width="40" height="35" className="d-inline-block align-text-top"/>
      Twimtter
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <NavLink className={({isActive})=>`nav-link ${isActive ?'text-warning'  :'text-white' }`} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </li> */}

        {navItems.filter((item)=> isLoggedIn ? item.visibility==='login' || item.visibility==='common' : item.visibility==='logout' || item.visibility==='common'  ) .map((item)=>(
            <li key={item?.name} className="nav-item">
                <NavLink to={item?.path} className={({isActive})=>`nav-link ${isActive ? `text-warning` :`text-white` }`}> {item?.name}
                </NavLink>

            </li>

        ))}
        {isLoggedIn && <li className="nav-item">  <button type="button" className="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#logoutModal" onClick={()=>setShowModal(true)}>LogOut</button>  </li>}
        

      </ul>
   
    </div>
  </div>
</nav>

{/* logout button Modal/popup */}
 <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="logoutModalLabel">Logout</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are u sure you want to LogOut?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hell No!</button>
        <button type="button" className="btn btn-primary" onClick={handleLogout} data-bs-dismiss="modal" >Yes Boi!</button>
      </div>
    </div>
  </div>
</div>
      
    </>
  )
}

export default Header
