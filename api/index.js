import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()


const app =express()
app.use(express.json())

//connect The database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connectted succesfully')
}).catch((error)=>{
    console.log(error)
})

app.use('/api/user',UserRouter)
app.use('/api/auth/',authRouter)
app.use((error,req,res,next)=>{
    const statusCode=  error.statusCode || 500
    const message = error.message||'internal server error'

    return res.status(statusCode).json({
        "succsuss":false,
        "statusCode":statusCode,
        "message":message
    })


})

app.listen(3000 , ()=>{
    console.log('listning on port 3000')
    
})