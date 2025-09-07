import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import fileUploadService from '../appwrite/fileUpload';
import { ID } from 'appwrite';
import postService from '../appwrite/post';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function CreatePost() {

  const location =useLocation()
  let isEditMode =false
  const {postData}= location.state || {} // this OR is mandadtory else fatt jayega
  // console.log(postData);
  if(postData) isEditMode =true
  // console.log(isEditMode);
  const {id} = useParams()
  // console.log(id);

  
  const editorRef = useRef(null);
  const fileRef = useRef(null)
  const navigate = useNavigate()
 const userId=  useSelector((state)=>state.auth.userData?.targets[0]?.userId)
   const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  const [selected,setSelected]= useState(null)
  const [title,setTitle]= useState('')
  const [slug,setSlug]= useState('')
  const [file,setFile]= useState('')

// this will casue infinite re-render error coz You’re calling setSelected and setTitle during render.Every time React re-renders, it runs this code again → state updates → re-render → loop 🔁. always remmber kahi bhi set wala function likha hai react ka toh satte update hotey hi component re render hota hai dobara so the infinite loop // direct set func use ni kr skety during the render
  // if(isEditMode){
  //   setSelected(postData?.status)
  //   setTitle(postData?.title)
  //   if(editorRef.current) editorRef.current.setContent(postData?.content);

  // }

  // isliye agar update mode hai toh pre filled chizo ko krdrdo but after compoent did mount / compoender ek baar dirst time render honey par use Effect fun chlega
  useEffect(()=>{
      if(isEditMode){
    setSelected(postData?.status)
    setTitle(postData?.title)
  
    // if(editorRef.current) editorRef.current.setContent(postData?.content);
      // above will not work will not set exsitng html conetnt in tinymce coz  useEffect with [] runs immediately after the first render.  At that moment, editorRef.current is still null because TinyMCE hasn’t mounted yet (its onInit hasn’t fired). since editorRef.current was null so not setContent


  }

  },[])

  const textTransform=(str)=>{
    if(str.trim() !=='' && typeof str==='string' ){
      return str.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return ''

  }

  useEffect(()=>{
    const result = textTransform(title)
    setSlug(result)
    // console.log(result);
    // console.log(slug);
    

  },[title]) // its like watching for an field and setting another field customize way

  const handleSubmit=async(e)=>{
    e.preventDefault()
    // console.log(title);
    // console.log(slug);
    let content = editorRef.current.getContent()
    // console.log(content);
    // console.log(file); //actual file object (binary data)
    // console.log(file?.name);
    // console.log(selected);
    // console.log(userId);
    let status= selected

    if(!editorRef.current.getContent()) return toast.error('Content cannot be Empty!')
    if(!selected) return toast.error('please select status')

      try {
 
        if(isEditMode){
          let featuredImage= postData?.featuredImage
          if(file){
             const resultFile= await fileUploadService.uploadFile(file)
              featuredImage= resultFile?.$id
          }

          const resultDocument= await postService.updatePost(postData?.$id,{title,content,featuredImage,userId,status})
          // console.log(resultDocument);
          
          if(resultDocument && resultDocument?.$id){
            setTitle('')
            setSlug('')
            setFile('')
            if(editorRef.current) editorRef.current.setContent('');
            content=''
            setSelected(null)
            if(fileRef.current) fileRef.current.value=''
            navigate('/my_posts')
            return toast.success('Post Updated Successfully!')

          }
          toast.error('Something Went Wrong')




        }
        else{



         if(file){
           const resultFile= await fileUploadService.uploadFile(file)
          //  console.log(resultFile);
           const featuredImage= resultFile?.$id
           const resultDocument= await postService.createPost((ID.unique()),{title,content,featuredImage,userId,status})
          //  console.log(resultDocument);
           if(resultDocument && resultDocument?.$id){
           
            // can use reduces to update allPosts and myPosts state variables(like useDispath(addMyPosts(payload)) || interall array.push) so that overalll ux will be fast(instant updates, no refetch,useful when same data in many compoenents). but risk of server data mismacth ,mianly we can use redux for like login etc sattes which is good and best
            // const allPosts = await postService.getAllPosts()
            // console.log(allPosts);
            // const myPosts = await postService.getMyPosts(userId)
            // console.log(myPosts);
      
            setTitle('')
            setSlug('')
            setFile('')
            if(editorRef.current) editorRef.current.setContent('');
            content=''
            setSelected(null)
            if(fileRef.current) fileRef.current.value=''
            navigate('/my_posts')
            return toast.success('Post Created Successfully!')



           }
            toast.error('Something Went Wrong')

           

         }
         }
        
      } catch (error) {
        toast(error.message)
        throw error
        
      }
    

  }

  return (
    <>
     <form onSubmit={handleSubmit} >
      <div id='container' className='d-flex flex-wrap justify-content-around' >
     

        <div id='left-post' className='d-flex flex-column gap-3 ' style={{width:"60%"}} >

          <div className="title">
            <label htmlFor="title" style={{fontSize:"1.5rem",fontWeight:"bold"}}>Title : </label>
           <input id='title' type="text" className="form-control" placeholder="title" aria-label="Username" aria-describedby="basic-addon1" required value={title} onChange={(e)=>(setTitle(e.target.value))}/>
            </div> 
            <div className="slug">
              <label htmlFor="slug" style={{fontSize:"1.5rem",fontWeight:"bold"}}>Slug : </label>
           <input type="text" id="slug" className="form-control" placeholder="slug" aria-label="Username" aria-describedby="basic-addon1" disabled required value={slug} />
           </div>

           <div className="content" style={{fontSize:"1.5rem",fontWeight:"bold"}}>
           <label htmlFor="">Content : </label>
             <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={ (_evt, editor) => editorRef.current = editor }
        initialValue={isEditMode ? postData?.content : ''}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      </div>
          
        </div>
        <div id='right-post' className='d-flex flex-column gap-3 ' style={{width:"35%"}} >
          <div className="inputFile">
            <label htmlFor="inputGroupFile02"  style={{fontSize:"1.5rem",fontWeight:"bold"}}>Image File : </label>
          <div className="input-group mb-3">
  <input 
    type="file" 
    className="form-control" 
    id="inputGroupFile02" 
    accept="image/*"
    // value={file} // In HTML/React, you cannot control the value of a file input (for security reasons). The browser doesn’t allow setting it programmatically, except to an empty string. That’s why React throws the error.
    //You can still capture the file via onChange.
    onChange={(e)=>{setFile(e.target.files[0])}} // actual file object/binary data
    ref={fileRef}
    required ={isEditMode ? false : true}
  />
          </div>

          {/* 👇 show preview if new file is selected */}
  {file && (
    <img
      src={URL.createObjectURL(file)}
      alt="New Preview"
      className="img-fluid mt-2 rounded"
      style={{maxHeight: "200px", objectFit: "contain"}}
    />
  )}

   {/* 👇 show existing preview if editing & no new file selected */}
  {!file && isEditMode && postData?.featuredImage && (
    <img
      src={fileUploadService.previewFile(postData.featuredImage)}
      alt="Existing Preview"
      className="img-fluid mt-2 rounded"
      style={{maxHeight: "200px", objectFit: "contain"}}
    />
  )}

          </div>
        <div className="dropdown" style={{width :"100%"}}>
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style={{width :"100%"}}>
    {selected ? selected : 'Select Status' }
  </button>
  <ul className="dropdown-menu " style={{width :"100%"}}>
    <li><button className="dropdown-item" type="button" value="1" onClick={()=>setSelected('active')} >active</button></li>
    <li><button className="dropdown-item" type="button" value="2" onClick={()=>setSelected('inactive')}>inactive</button></li>
  </ul>
       </div>

       <button type="submit" className="btn btn-primary w-100">{isEditMode ? 'Update' :`Create` } </button>


        </div>
        
      </div>
        </form>
    </>
  )
}

export default CreatePost
