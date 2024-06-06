import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
dotenv.config()


const app =express()
//connect The database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connectted succesfully')
}).catch((error)=>{
    console.log(error)
})

//middleware
app.use(cors({
    origin: 'http://localhost:5173' // Adjust the origin to match your frontend port
  }));

app.use(express.json())
//routes
app.use('/api/user',UserRouter)
app.use('/api/auth/',authRouter)


//error handling middleware
//note always make error middleware uneder all code 
app.use((error,req,res,next)=>{
    const statusCode =  error.statusCode || 500
    const message = error.message||'internal server error'

    return res.status(statusCode).json({
        "success":false,
        "statusCode":statusCode,
        "message":message
    })})




app.listen(3000 , ()=>{
    console.log('listning on port 3000')
    
})