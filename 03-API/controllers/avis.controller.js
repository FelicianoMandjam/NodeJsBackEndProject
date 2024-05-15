import { Article, User } from '../models/index.js'; // Importe le modèle Avis et Article pour interagir avec la base de données

export const create = async (req, res) => {
    try {
        // Recuperation de l'article afin de pouvoir créer un avis directement depuis l'article
        const article = await Article.findByPk(req.params.articleId);

        // // On crée l'avis depuis l'article récupéré afin de faire la relation entre les 2
        await article.createReview({ ...req.body, UserId: req.user.id });

        // Envoie une réponse avec le statut 201 (créé) et un message de réussite
        res.status(201).json("Avis add !")
    } catch (error) {
        console.log(error)
        // En cas d'erreur, renvoie une réponse avec le statut 500 (erreur interne du serveur) et le message d'erreur
        res.status(500).json({ error: "Erreur lors de la création de l'avis!" })
    }
}

// ________________________________COrrection
// import Avis from '../models/avis.model.js'; // Importe le modèle Avis pour interagir avec la base de données
// import Article from '../models/article.model.js'; // Importe le modèle Article pour interagir avec la base de données

// const create = async (req, res) => {
//     try {
//         // Création d'un nouvel avis avec les données du corps de la requête et l'ID de l'utilisateur
//         const avis = await Avis.create({ ...req.body, user: req.user.id })
//         // Mise à jour de l'article avec l'ID du nouvel avis
//         const article = await Article.findByIdAndUpdate(req.params.articleId, { $push: { avis: avis._id } }, { new: true })
//         // Envoie une réponse avec le statut 201 (créé) et un message de réussite
//         res.status(201).json("Avis add !")
//     } catch (error) {
//         // En cas d'erreur, renvoie une réponse avec le statut 500 (erreur interne du serveur) et le message d'erreur
//         res.status(500).json({ error: "Erreur lors de la création de l'avis!" })
//     }
// }

// export {
//     create
// }