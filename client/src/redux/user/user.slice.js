import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   currentUser: null,
   loading: false,
   error: null
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
       signInStart: (state) => {
           state.loading = true;
           state.error = null
       },
       signInSuccess: (state, action) => {
           state.loading = false;
           state.currentUser = action.payload;
           state.error = null;
       },
       signInFail: (state, action) => {
           state.error = action.payload;
           state.loading = false;
       },
       updateStart:(state , action)=>{
         state.loading=true
         
       },
       updateSuccess:(state , action)=>{
        state.currentUser =action.payload
        state.error = null
        state.loading=false
        
       },
       updateFail:(state, action)=>{
        state.error = action.payload
        state.loading = false
       },
       deleteStart:(state , action)=>{
        state.loading=true
        
      },
      deleteSuccess:(state , action)=>{
       state.currentUser =null
       state.error = null
       state.loading=false
       
      },
      deleteFail:(state, action)=>{
       state.error = action.payload
       state.loading = false
      },
      signOutStart:(state , action)=>{
        state.loading=true
        
      },
      signOutSuccess:(state , action)=>{
       state.currentUser =null
       state.error = null
       state.loading=false
       
      },
      signOutFail:(state, action)=>{
       state.error = action.payload
       state.loading = false
      }
   }
})

export const { signInStart, signInSuccess, signInFail ,updateFail , updateStart
     ,updateSuccess, deleteFail ,
      deleteSuccess , deleteStart,
     signOutFail , signOutStart , signOutSuccess} = userSlice.actions

export default userSlice.reducer
