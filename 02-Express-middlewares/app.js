const express = require('express');
const app = express();
// code
app.use( (req, res, next) => {
    console.log("First middleware");
    next();
} );

app.use( (req, res, next) => {
    console.log("Second middleware");
    next();
} );

app.use( (req, res) => {
    // res.status(200);
    res.status(201).json({message : "... ceci est le message dans le json de status 201"});
} );

module.exports = app 