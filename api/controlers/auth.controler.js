
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
     console.log(next(error))
   }
  
}


// Sign In
export const signIn = async (req, res, next) => {
   const { email, password } = req.body;
 
   try {
     const validUser = await User.findOne({ email });
     if (!validUser) {
       return next(customError(404, 'User not found'));
     }
 
     const validPassword = bcryptjs.compareSync(password, validUser.password);
     if (!validPassword) {
       return next(customError(401, 'Invalid credentials'));
     }
 
     const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
     const { password: pass, ...rest } = validUser._doc;
 
     res.cookie('access_token', token, { httpOnly: true , // Set to true only in production
      sameSite: 'strict',}).status(200).json(rest);
   } catch (error) {
     next(error.message);
   }
 };
 


 export const google =async (req, res , next)=>{

  const findUser = await User.findOne({email: req.body.email})
  try {
    if(findUser){
      const {password:pass , ...rest} = findUser._doc
    const token  =  jwt.sign({id:findUser._id},process.env.JWT_TOKEN)

    return res.status(201).cookie('access_token' , token , {httpOnly:true}).json(rest)
 
    }
    else{
      const randomPass  = Math.random().toString(36).slice(-8)
      const encryptedPass = bcryptjs.hashSync(randomPass , 10)
      const newUser = new User ({username:req.body.username
        .split(" ").join("")
        .toLowerCase()
        +Math.random().toString(36).slice(-4) ,
        email:req.body.email ,
         password:encryptedPass ,
         avatar:req.body.avatar})
         await newUser.save();
      return res.status(201).json('sign up successfull')
    }

  } catch (error) {
    next(error)
  }
  


 }


 export const signout = (req, res , next)=>{
  try {
        res.clearCookie('access_token')
        res.status(200).json({message:'sign out succcesfull '})
  } catch (error) {
     next(error)
     
  }
}