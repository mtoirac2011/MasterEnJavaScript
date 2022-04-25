'use strict'

//Hacer connection a Mongo
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Para levantar Servidor WEB
var app = require('./app');
var port = 3700;

mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log('Connexion successfully!!!');

        //Creacion del Servidor
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:3700');
        });
    })
    .catch(err => console.log(err));