const http = require('http');


const server = http.createServer((req , res) => {
    res.end("Hello word")
    console.log("Feliciano")
})

// On choisi le port lequelle on veut que le serveur soit écouté
server.listen(3000)