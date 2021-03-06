'use strict'

//Hacer connection a Mongo
var mongoose = require('mongoose');


//Para levantar Servidor WEB
var app = require('./app');
var port = 3700;

//Levantar conexion y servidor WEB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log('Connexion successfully!!!');

        //Creacion del Servidor
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:3700');
        });
    })
    .catch(err => console.log(err));