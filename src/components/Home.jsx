import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {Loader, Posts} from '../components'
import postService from '../appwrite/post'

function Home() {

     const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
    //  if(!isLoggedIn) toast.warning("Please Login First to see Posts!") // will give error in console ,because you’re calling toast.warning(...) directly in the render flow of Home.
    // That means while React is rendering Home, you are also causing a state update inside react-toastify → React complains ,Move the toast logic into a useEffect, so it runs after render, not during:

      useEffect(()=>{
     if(!isLoggedIn) toast.warning("Please Login First to see Posts!")
      else{
    fetchAllPosts()
    }

      },[isLoggedIn]) // run again whenerver isLoggedIn changes(jo ki shi baat hai)

const [postsData,setPostsData]= useState(null)
const [loading,setLoading]= useState(true)

      async function fetchAllPosts(){
        try {
          const res = await postService.getAllPosts()
          // const data = await res.json()
          // console.log(res);
          
           setPostsData(res?.documents)
          
        } catch (error) {
          throw error
          
        }
        finally{
          setLoading(false)
        }

      }

      

  return (
    <>
    {isLoggedIn ? 

      loading  ? <Loader/> : 
    <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
    {postsData && postsData.map((item)=>(
      
    <Posts key={item?.$id} Obj={item} /> 
  
    ))}
      </div>

    : <h1 >Please Login First to see Posts!</h1>}
   
      
    </>
  )
}

export default Home
