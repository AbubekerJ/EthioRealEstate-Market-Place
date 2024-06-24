import express from 'express';

import { signUp ,signIn, google, signout} from '../controlers/auth.controler.js'


const router = express.Router();

router.post('/signUp',signUp); 
router.post('/signIn',signIn)
router.post('/google',google)
router.get('/signout' , signout)

export default router;
