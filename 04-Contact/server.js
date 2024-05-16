import express from 'express'
import { env } from './config.js'
import cors from 'cors'

// ROUTES 
import routeContact from './routes/contact.js'
// Connexion Mysql
import './model/index.js'

const app = express()

// Port 
const PORT = env.port || 8080

// MiddleWare 
app.use(express.json())
app.use(cors())

// Middleware to route
app.use('/contact' , routeContact)

// Listen
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

