import express from 'express'
import { deleteUser, test , update  , } from '../controlers/user.controler.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.get(('/test'),test)
router.post('/update/:id'  , verifyToken, update)
router.delete('/delete/:id' ,verifyToken, deleteUser)


export default router