import Listing from "../models/listing.model.js"
import { customError } from "../utils/error.js"

export const createlisting =async (req , res , next)=>{
     try {
        const lising = await Listing.create(req.body)
        res.status(201).json('list created sucessfully')
        
     } catch (error) {
        next(error)
     }
}



export const showListing = async(req , res , next)=>{
   if(req.user.id!==req.params.id){
      return next(customError(401 , 'you can only see your listings'))

   }
   try {
   const lisings = await  Listing.find({userRef:req.params.id})
   if(!lisings){
      return next(customError(404 , 'listing not found'))
   } 
   res.json(lisings)
      
   } catch (error) {
      next(error)
   }
   
}



export const deleteListing = async(req, res , next)=>{
     const listing  = await Listing.findById(req.params.id)
     if(!listing){return next(customError(404 ,  'listing not foun'))}
     if(req.user.id!==listing.userRef)return next(401 ,'you can only update your listing')
    try {
       await Listing.findByIdAndDelete(req.params.id)
      res.status(200).json({message:'listing has been deleted'})
      
    } catch (error) {
      next(error)
    }
}


export const updateListing = async(req, res , next)=>{
   const listing = await Listing.findById(req.params.id)
   if(!listing)return next(customError(404 , 'listing not found'))
   if(req.user.id!==listing.userRef)return next(401 ,'you can only update your listing')
   try {
     await Listing.findByIdAndUpdate(req.params.id , req.body ,{new:true})
     res.status(201).json('listing updated successfully')
      
   } catch (error) {
      next(error)
   }
}


export const getListing = async(req , res , next)=>{
   try {
     
      const listign = await  Listing.findById(req.params.id)

      res.status(200).json(listign)
   } catch (error) {
      next(error)
   }
}
export const myListing = async(req , res , next)=>{
   try {
     
      const listign = await  Listing.findById(req.params.id)
      if(!listign)return next(customError(404 , 'listing not foiund '))
      res.status(200).json(listign)
   } catch (error) {
      next(error)
   }
}
