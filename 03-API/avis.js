import Avis from "./avis.model.js"
import articleModel from "./article.model"
import express from "express"
import { verifieToken } from "./auth.js"

const router = express.Router()

// Post Avis 
router.post('/:articleId' , verifieToken, async (req , res) => {
    try {
        const avis = await  Avis.create({...req.bady, user: req.user.id})
        const article = await articleModel.findByIdAndUpdated(req.params.articleId, { $push: { avis : avis._id }},{new: true})
        res.status(201).json("Avis add.")
    } catch (error) {
        res.status(500).json({error: "Erreur lors de la création de l'Avis!"})
    }
})
// Get ALl Review for
router.get('/:id/avis',async (req,res)=>{
    try {
        const article =await articleModel.findById(req.params.id).populate('avis')
        res.status(200).json(article.avis)
    } catch (error) {
        res.status(500).json({error : "Erreur."})
    }
})

export default router;