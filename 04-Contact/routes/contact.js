import express from 'express'
import { add , sendMail} from '../controller/contact.controller.js';
//  Je recup les fonctions
// import {} from "../controller/contact.controller"

const router = express.Router();

router.post('/' , add )
router.post('/mail' , sendMail)


export default router