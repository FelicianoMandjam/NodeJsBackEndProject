import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import { env } from './config.js';

export const verifieToken = (req , res ,next ) =>{
    // Je vais chercher le token et je le stock dans une varibale
    const token = req.cookies.access_token;

    // Je verifie son existance 
    if(!token) return next(createError(401, "Access Denied")); 

    // Je verifie sa validité 
    jwt.verify(token , env.token , (err , user)=>{
        // Si le token  n'est pas valide
    if(err){
        return next(createError(403, "Token non valide !"))
    }  
        // Si le token est valide je rajoute les information de la requete de l'utilisateur dans l'objet req 
        req.user = user
        next()
    })
}  

