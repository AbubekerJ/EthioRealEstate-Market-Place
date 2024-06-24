import express from 'express'

 import { createlisting, showListing  , deleteListing , updateListing  , myListing ,getListing  } from '../controlers/listing.controler.js'
import { verifyToken } from '../utils/verifyToken.js'


const router = express.Router()


router.post('/createlisting' ,createlisting)
router.get('/showListing/:id', verifyToken, showListing)
router.delete('/deleteListing/:id' , verifyToken , deleteListing)
router.post('/updateListing/:id' ,verifyToken ,  updateListing)
router.get('/getListing/:id' ,  getListing)
router.get('/myListing/:id' ,  myListing)



export default router