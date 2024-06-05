
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { customError } from "../utils/error.js";
import jwt from 'jsonwebtoken'




//signUp
export const signUp = async (req, res ,next)=>{
   console.log( req.body)
   const {username , email , password} = req.body;
   const encriptedPass =  bcryptjs.hashSync(password,10)
   const newUser = new User({username , email, password:encriptedPass})
   try {
      await newUser.save()
      res.status(201).json({ message: 'User signed up successfully' })

   } catch (error) {
     next(error)
   }
  
}


//sign In 
export const signIn= async (req, res ,next)=>{
   const  {email , password} =req.body
   const encriptedPass = bcryptjs.hashSync(password , 10)
   try {
      const validUser = await User.findOne({email})
      if(!validUser){
        return next(customError(404 , 'user not found '))
      }
      const validdPassword  = bcryptjs.compareSync(password , validUser.password) 
      if(!validdPassword){
         return next(customError(401 , 'invalid Credential'))
      }
      const token = jwt.sign({id:validUser._id},process.env.JWT_TOKEN)
     const  {password:pass , ...rest}=validUser._doc
      res.cookie('access_token', token, { httpOnly: true} ).status(200).json({rest})
      
   } catch (error) {
      next(error)
   }


}