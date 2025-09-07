import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allPosts : [],
    myPosts : []
}
// and we can set values of allPosts and myPosts just one time when tha app starts,ie.e app.jsx and conditon user is logged in  and then useing useSelector take value of allPosts and myPosts anywhere in any component  , fastly,simplly,sync.lii
const postSlice =createSlice({
    name: 'post',
    initialState,
    reducers : {
        setAllPosts : (state,action)=>{
            state.allPosts.push(action.payload.allPosts) 
        },
        setMyPosts : (state,action)=>{
            state.myPosts.push(action.payload.myPosts)    
        }
    }
})

export const {setAllPosts,setMyPosts} =postSlice.actions

export default postSlice.reducer