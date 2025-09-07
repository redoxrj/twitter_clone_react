import { useEffect, useState } from 'react';
import './App.css'
import { Outlet } from 'react-router-dom';
import {Header,Loader} from './components'
import authService from './appwrite/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {login as loginReducer} from './redux/authSlice'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL); 

  const [loading,setLoading] =useState(true)
  const dispatch = useDispatch()

   useEffect(()=>{
        const checkIsUserLoggedIn  = async()=>{
          try {
            // hmarri web app open hotey hai hi saari intiial details check kar li like ki kya user logged in hai and etc. taaki baad mein har compoenets ko pta chla jaayge store se and act accrdingly
            const result = await authService.getCurrentUser() 
            // console.log(result)
            if(result && result?.$id){
            const payload = {
              userData : result
            }
            dispatch(loginReducer(payload))
          }
            
          } catch (error) {
            
            // console.log(error);//AppwriteException: User (role: guests) missing scopes (["account"]) // A guest (not logged-in) user does not have permission to access the account scope.You are trying to call an account-related API (getCurrentUser(), createEmailPasswordSession(), etc.) but the current client is not authenticated yet.
            //If there is no session/token stored in the browser(local storage) (meaning the user hasn’t logged in before or session expired),Appwrite considers you a guest and rejects the request with missing scopes (["account"]).
            //Instead of showing a toast error when it’s just a guest, you can safely catch the exception and continue:

            if(error.code!==401){
              toast.error(error.message)
            }
            
          }
          finally{
            setLoading(false)
          }

        }
        checkIsUserLoggedIn()

      },[])
      //✅ With [] ->Runs only once after the component mounts (like componentDidMount in class components).Best for things like fetching the logged-in user, initializing data, or setting up subscriptions(taht's why we have done this in app.jsx as app.jsx is starting of this whole app).This is the correct choice for your login check logic — you don’t want it running again and again on every render.

      //⚠️ Without [] ->Runs on every render/extra render due to any satte update other than actual first time redner (after React finishes painting).(for example koi bhi satte update hoti hai after first time render/paint of compoennt say in a usefeeect or anywhere then the componnnet will render jo ko shi bat hai but checkIsUserLoggedIn() nhi call honaa chayyie dobara ffaltu ka api call/login wgera check siff one-time hona chayie wo bhi sirft fist time pe jab fist time component actul mein mount hota h ) 
      //If your component re-renders frequently, this will trigger the API call (authService.getCurrentUser()) again and again → multiple dispatches, multiple setLoading(false) calls, and potential infinite loops.Very inefficient and usually not what you want.
 
  return (
    <>
    {loading? <Loader/> : 
    <>
      <Header/>
      <Outlet/>
      </>
      }
    </>
  )
}

export default App
