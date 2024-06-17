import { customError } from "../utils/error.js"
import User from "../models/user.model.js"

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
      const UpdateUser = await User.findByIdAndUpdate(req.params.id , {$set:{username:req.body.username,email:req.body.email,password:req.body.password},},{new:true})
       const {password ,...rest}=UpdateUser._doc
       return res.status(201).json(rest)
      
   } catch (error) {
      next(error)
   }
}
   