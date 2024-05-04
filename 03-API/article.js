import express from "express";
import articleModel from "./article.model.js";
import { verifieToken } from "./auth.js";
import { createError } from "./error.js";
// import { env } from './config.js' ;

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const AllArticles = await articleModel.find();
    res.status(200).json(AllArticles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ createError: "Error lors de la récupération" });
  }
});

// ADD - odification et Suppression que les produits que l'USER à crée

router.post("/add", verifieToken, async (req, res) => {
  try {
    const articleInfo = await req.body;
    const article = await articleModel.create(articleInfo);
    if (article) res.status(201).json("Un nouveau article a été crée");
  } catch (error) {
    console.log("entree dans l'error de add");
    console.log(error);
    res.status(200).json("Erreur Création d'article");
  }
});

router.get("/:id", verifieToken, async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleModel.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
});

router.put("/update/:id", verifieToken, async (req, res) => {
  try {
    const id = req.params.id;
    const art = await articleModel.findById(id);

    console.log(id);
    console.log(req.user.id);
    console.log(req.body.user);

    if (art.user.toString() == req.user.id) {
      // Le 3éme parametre de findByIDUpdate {new : true} sert à récupérer l'OBJET JSON directement
      const article = await articleModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!article) return res.status(404).json("Article not found ! ");
      res.status(200).json(article);
      console.log("Changement reussie avec le meme token");
    } else {
      console.log("Pas le meme token");
      res.status(403).json("Probleme d'authentification");
    }
  } catch (error) {
    console.log("entree dans l'error de add");
    console.log(error);
    res.status(500).json("Probleme d'authentification");
  }
});

router.delete("/delete/:id", verifieToken, async (req, res) => {
  try {
    const id = req.params.id;
    const art = await articleModel.findById(id);

    if (art.user.toString() == req.user.id) {
      const article = await articleModel.findOneAndDelete(id);
      res.status(200).json(article);
      if (!article) return res.status(404).json("Article not found ! ");
      console.log("DELETE reussie avec le meme token");
    } else {
      console.log("Pas le meme token");
      res.status(200).json("Probleme d'authentification");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Probleme d'authentification");
  }
});

// Filtrer par prix ascendant
router.get('/sort/asc' , async (req , res) =>{
    try {
        const articles = await articleModel.find().sort('price')
        res.status(200).json(articles)
    } catch (error){
        res.status(500).json('Erreur récuperation')
    }
})

// Filtrer par prix descendant
router.get('/sort/desc' , async (req , res) =>{
    try {
        const articles = await articleModel.find().sort('-price')
        res.status(200).json(articles)
    } catch (error){
        res.status(500).json('Erreur récuperation')
    }
})

// Get user by name
router.get("/user/articles" , async (req , res)=>{
    try {
        const articles = await articleModel.find ({user : req.user.id})
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json("Erreur")
    }
})

// Get All Reviews for an Article


export default router;
