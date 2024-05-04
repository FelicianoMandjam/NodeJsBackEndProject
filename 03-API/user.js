import express from "express" ;
import ModelUser from "./user.model.js" ;
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;
import { env } from './config.js' 

const router = express.Router();
router.post('/sign', async (req , res) => {
  try {
    // Recherche l'user dans la base de données par son email
    const user = await ModelUser.findOne({email: req.body.email})
    // On verifie si l'utilise si l'utilisateur existe
    if(!user) return res.status(404).json("User not found !")
    
    // Compare le mot-de-passe fourni dans la requête avec le mot-de-passe de l'utilisateur (qui est dans le bdd)
    const comparePassword = await bcrypt.compare(req.body.password, user.password)

    // SI le mot-de-passe est incorrect , renvoie une erreur 400
    if(!comparePassword) return res.status(400).json("Wrong Credentials! ")

    const token = jwt.sign({id: user._id}, env.token , {expiresIn:"24h"} )
    // Supprimer le mot-de-passe du user pour des raisons de sécurité. 
    const { password, ...otherSansLeMDP } = user._doc


    // Envoie le jeton {token} JWT sous forme de cookie HTTPonly
    res.cookie('access_token' , token , {httpOnly: true}).status(200).json(otherSansLeMDP);

  } catch (e) {
    console.log(e)
  }
});

// router.post('/deco', async (req , res) => {
//   const token = req.cookies.access_token;
// })

router.get("/all", async (req, res) => {
  const AllUser = await ModelUser.find();
  res.status(200).json(AllUser);
});

router.get("/get/:id", async (req , res)=>{
  
  const id = req.params.id
  const user = await ModelUser.findById(id);
  res.status(200).json(user)
})

router.post("/add", async (req, res) => {
 const hadedPassword = await bcrypt.hash(req.body.password , 10)
 const user = await  ModelUser.create({
  ...req.body,
  password: hadedPassword
 })
 res.status(201).json({message: "user has been created!" , user})
});

router.put("/update/:id", async (req , res ) => {
  const id = req.params.id
  const user = await ModelUser.findByIdAndUpdate(id , req.body , {new : true})
  res.status(200).json(user)
})

router.delete("/delete/:id", async (req,res) => {
  const id = req.params.id
  const user = await ModelUser.findOneAndDelete(id)
  res.status(200).json(user)
})


export default router;
