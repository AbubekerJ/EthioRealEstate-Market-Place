import React, { useState } from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import  { useNavigate } from 'react-router-dom'
import { signInSuccess , signInStart , signInFail ,  } from '../redux/user/user.slice.js'

function OAuth() {
    const dispath = useDispatch()
    const navigate  =useNavigate()
    const {error}=useSelector(state=>state.user)
    const [signUpError , setSignUpError] = useState(false)
    const handleGoogleAuth = async()=>{
        try {
            dispath(signInFail(null))
            const provider  = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result  =await signInWithPopup(auth , provider)
            console.log(result)
           const Googleuser = {username:result.user.displayName , email:result.user.email ,avatar:result.user.photoURL}
            const res  = await fetch ('http://localhost:3000/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Googleuser),
                credentials: 'include', 
            })
            const data = await res.json()
            if(data.success ==='false'){
               
               setSignUpError(error.message)
               
            }
            dispath(signInSuccess(data))
            navigate('/')

        } catch (error) {
          
          setSignUpError(error.message)
        
           console.log(error.message)
        }
    }



  return (
    <>  <button onClick={handleGoogleAuth}  type='button' className='bg-gradient-to-r from-amber-400 to-amber-900 rounded-lg   text-center text-white uppercase p-3'  >
    continue With Google
  </button>

     <p className='text-sm text-red-400'>{signUpError&&signUpError}</p>
     </>
   
  
  )
}

export default OAuth
