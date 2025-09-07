import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Home,Signup,Login,CreatePost,Posts} from './components'
import { ToastContainer } from 'react-toastify'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import MyPosts from './components/MyPosts.jsx'
import SinglePost from './components/SinglePost.jsx'
import Protected from './components/AuthLayout.jsx'


const router =createBrowserRouter(createRoutesFromElements(

     <Route path="/" element={<App />}>

        <Route path="" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

         {/* Protected routes */}
         <Route element={<Protected />} >
        <Route path="create_post" element={<CreatePost />} />
        <Route path="my_posts" element={ <MyPosts /> } />
        <Route path="view_post" element={<SinglePost />} />
        <Route path="edit_post/:id" element={<CreatePost />} />
        </Route>

        

    </Route>

))

createRoot(document.getElementById('root')).render(
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    <ToastContainer/>
    </>
)
