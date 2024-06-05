import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
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
