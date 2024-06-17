import express from 'express'
import { test , update } from '../controlers/user.controler.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.get(('/test'),test)
router.post('/update/:id'  , verifyToken, update)

export default router