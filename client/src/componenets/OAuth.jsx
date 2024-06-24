import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import  { useNavigate } from 'react-router-dom'
import { signInSuccess , signInStart , signInFail   } from '../redux/user/user.slice'

function OAuth() {
    const dispath = useDispatch()
    const navigate  =useNavigate()
    const {error}=useSelector(state=>state.user)
    const handleGoogleAuth = async()=>{
        try {
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
               dispath(signInFail(data.message))
            }
            dispath(signInSuccess(data))
            navigate('/')

        } catch (error) {
           signInFail(error)
        }
    }



  return (
    <>  <button onClick={handleGoogleAuth}  type='button' className='bg-blue-500 p-3 rounded-lg   text-center text-white uppercase'  >
    continue With Google
  </button>
     <p>{error&&''}</p> </>
  
  )
}

export default OAuth
