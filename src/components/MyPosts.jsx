import React, { useEffect, useState } from 'react'
import postService from '../appwrite/post'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import Posts from './Posts'

function MyPosts() {

    const [loading,setLoading]=useState(true)
    const userId = useSelector((state)=>state.auth.userData?.targets[0]?.userId)
    const [myPosts,setMyPosts]= useState(null)
    

    const fetchMyPosts = async()=>{
        try {
            const response= await postService.getMyPosts(userId)
            // console.log(response);
            
            setMyPosts(response?.documents)
            
        } catch (error) {
            throw new Error(error.message);
            
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchMyPosts()

    },[])

  return (
    <>
    {loading ? <Loader/> : 

    <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>

    {myPosts && myPosts.map((item)=>(
        <Posts key={item?.$id} Obj={item} status ={item?.status} mode='edit' />
    ))}
     </div>
   
    }
      
    </>
  )
}

export default MyPosts
