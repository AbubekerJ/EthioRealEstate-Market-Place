import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path';

dotenv.config()


const app =express()
app.use(express.json())
app.use(cookieParser())
//connect The database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connectted succesfully')
}).catch((error)=>{
    console.log(error)
})

// path
const __dirname = path.resolve();

//middleware
app.use(cors({
    origin: 'http://localhost:5173', // Adjust the origin to match your frontend port
    credentials: true 
  }));


//routes
app.use('/api/user',UserRouter)
app.use('/api/auth/',authRouter)
app.use('/api/listing/',listingRouter)

// for the deploy 
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

//error handling middleware
//note always make error middleware uneder all code 

app.use((error,req,res,next)=>{
    const statusCode =  error.statusCode || 500
    const message = error.message||'Please Check Your Connecton'

    return res.status(statusCode).json({
        "success":false,
        "statusCode":statusCode,
        "message":message
    })})




app.listen(3000 , ()=>{
    console.log('listning on port 3000')
    
})