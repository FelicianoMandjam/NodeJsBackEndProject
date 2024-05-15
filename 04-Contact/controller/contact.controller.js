import {Contact} from '../model/index.js';

export const add = async (req ,res) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).json("contact crée")
        console.table(contact)
        
    } catch (error) {
        console.log('Add marche pas')
        res.status(500).json({error: "Erreur lors de la création. "})
    }
}

