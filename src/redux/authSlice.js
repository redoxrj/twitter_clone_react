import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    userData: null
}

const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers : {  // redux Reducers must be pure functions → no API calls, no promises, no side effects.// redcuers(funcs) are used only for state updates preesent in store,Keeps business logic (API calls) separate from state management.
        login : (state,action)=>{
            state.isLoggedIn=true
            state.userData=action.payload.userData

        },
        logout : (state)=>{
            state.isLoggedIn=false
            state.userData=null

        },
    }
})

export const {login,logout} =authSlice.actions

export default authSlice.reducer