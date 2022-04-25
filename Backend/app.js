'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar arcchivos de rutas

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

//CORS

//Rutas

app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola Mundo desde mi API NodeJs"
    });
});

//Exportar
module.exports = app;