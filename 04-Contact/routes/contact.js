import express from 'express'
import { add } from '../controller/contact.controller.js';
//  Je recup les fonctions
// import {} from "../controller/contact.controller"

const router = express.Router();

router.post('/' , add )


export default router