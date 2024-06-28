import { customError } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken =(req , res ,next)=>{
    //you need to install cookie-parser first
    const token = req.cookies.access_token
    if(!token){
       return  next(customError(401 , '  Unauthorized , Sign In to Continue!'))
    }
    jwt.verify(token , process.env.JWT_TOKEN ,(err , decode)=>{
        //decode is the payload that we gave when we sign the json web token =jwt.sign({id:verified_id})
        if(err){
          return  next(customError(401 ,'Forbiden '))
        }
        req.user = decode;
        next()
    })

}