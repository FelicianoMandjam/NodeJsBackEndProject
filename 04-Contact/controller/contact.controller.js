import {Contact} from '../model/index.js';
import NodeMailer from 'nodemailer'

// NodeMailer
const transport = NodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f4ca98e0a328ea",
      pass: "7670b752c137ef"
    }
  });
  

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

export const sendMail = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);

        await transport.sendMail({
            from: '"Maddison Foo Koch 👻" <sendeur@example.email>', // sender address
            to: "recepteur@example.com, baz@example.com", // list of receivers
            subject: "Nouvelle liste de contact", // Subject line
            text: "Hello world?, nouveau contact", // plain text body
            html: "<b>Hello world?</b>", // html body
          });

        res.status(201).json(contact);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Erreur lors de l'envois",
            // trace: err
        })
    }
}

