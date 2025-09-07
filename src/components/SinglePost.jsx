import React from 'react'
import { useLocation } from 'react-router-dom'
import fileUploadService from '../appwrite/fileUpload'

function SinglePost() {

  const location  = useLocation()
  const {postData : Obj}= location.state || {} //// post passed from Link wow/poora obj prop hi pass kr dia direct

  return (
    <>
     <div className="card" style={{width: "30rem", margin: "auto"}}>
  <img src={fileUploadService.previewFile(Obj?.featuredImage)} className="card-img-top rounded-circle p-3 mx-auto" style={{width: "300px"}} alt="User Image"/>
  <div className="card-body text-center">
    <p className='fw-semibold' style={{fontSize:"1.1rem"}} >user : {Obj?.userId}</p>

    <h5 className="card-title">{Obj?.title }</h5>
     <div className="card-text" dangerouslySetInnerHTML={{ __html: Obj?.content }}></div>
  </div>
</div>
      
    </>
  )
}

export default SinglePost
