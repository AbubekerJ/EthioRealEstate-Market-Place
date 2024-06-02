import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//connect The database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connectted succesfully')
}).catch((error)=>{
    console.log(error)
})

const app = express()



app.listen(6000 , ()=>{
    console.log('listning on port 6000')
})