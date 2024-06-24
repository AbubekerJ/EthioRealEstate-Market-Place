import { customError } from "../utils/error.js"
import User from "../models/user.model.js"

import bcryptjs from 'bcryptjs'

export const test = (req, res)=>{
   res.send('test')
}

export const update = async (req, res , next)=>{
   if (req.user.id!==req.params.id){
      return next(customError(401 , 'you can only update your informtion '))
   }
   try {
      if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password , 10)
      }
      const UpdateUser = await User.findByIdAndUpdate(req.params.id , {$set:{username:req.body.username,email:req.body.email,password:req.body.password,avatar:req.body.avatar},},{new:true})
       const {password ,...rest}=UpdateUser._doc
       return res.status(201).json(rest)
      
   } catch (error) {
      next(error)
   }
}



export const deleteUser = async(req , res , next)=>{
   try {
      if (req.user.id!==req.params.id){
         return next(customError(401 , 'You can only delet your account'))
      }
        await User.findByIdAndDelete(req.params.id )
        res.clearCookie('access_token')
       res.status(200).json({message:'user deleted successfully '})

      
   } catch (error) {
      
      next(error)
   }

}

