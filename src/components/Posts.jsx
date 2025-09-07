import React from 'react'
import fileUploadService from '../appwrite/fileUpload'
import { Link, useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'
import { toast } from 'react-toastify'
import postService from '../appwrite/post'

function Posts({Obj,status,mode}) {
  // console.log(fileUploadService.previewFile("68bb76a4002aadccf9da")); -> image source link milta hai get ki
  const navigate  = useNavigate()

  const deletePost=async(id)=>{
    try {
      const result = await postService.deletePost(id)
      // console.log(result);
      
      if(result){
        navigate('/')
        return toast.success('Post deleted Successfully')

      }
      toast.success('something went wrong!')

      
    } catch (error) {
      toast.error(error.message)
      
    }
    
  }
  
  return (
     <>
    <div className="card" style={{"width": "18rem"}}>
  <img src={fileUploadService.previewFile(Obj?.featuredImage)} className="card-img-top img-fluid w-50 h-50"  alt="..." width={"100px"}/>
  <div className="card-body">
    <p className='fw-semibold' style={{fontSize:"1.1rem"}} >user : {Obj?.userId}</p>
   {status &&  <p className='fw-semibold' style={{fontSize:"1.1rem"}} >Status : {Obj?.status}</p>} 
    <h5 className="card-title">{Obj?.title}</h5>
    {/*dangerouslySetInnerHTML provided by react to parse html/render html in react */}
    <div className="card-text text-truncate" dangerouslySetInnerHTML={{ __html: Obj?.content }}></div>
    {}
    {/* Pass full object prop/data via Link state ,wow/poora obj prop hi pass kr dia direct */}
    <Link to={mode==='edit' ? `/edit_post/${Obj?.$id}` : `/view_post`} state={{postData : Obj}} className="btn btn-primary">{mode==='edit' ? 'Edit Post' : `View Post`}</Link>
    {mode==='edit' &&  <i className="bi bi-x-square todo-icon delete-icon" style={{
      color: "#fff",
      backgroundColor: "#dc3545",
      borderRadius: "8px",
      padding: "6px 8px",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 6px rgba(220, 53, 69, 0.4)",
      marginLeft :"10px"
    }} onClick={()=>deletePost(Obj?.$id)}></i>}
  </div>
</div>
      
    </>
  )
}

export default Posts
