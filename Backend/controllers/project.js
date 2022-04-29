'use strict'

var Project = require('../models/project');


//Utilizar libreria cdo quiero borrar un archivo
var fs = require('fs');

var controller = {

    home: function(rep, res) {
        return res.status(200).send({
            message: 'Soy la HOME'
        });
    },

    sayHello: function(req, res) {

        return res.status(200).send({
            messaje: 'Hello World'
        });
    },

    test: function(rep, res) {
        return res.status(200).send({
            message: 'Soy la TEST de mi NodeJS App'
        });
    },

    getProject: function(req, res) {

        var projectId = req.params.id;

        Project.findById(projectId, (err, project) => {
            //Comprobar si hay parametros en la URL
            if (projectId == null) return res.status(500).send({ messaje: 'El proyecto no existe' });

            if (err) return res.status(500).send({ message: 'Error al devolver proyecto' });

            if (!project) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({
                project: project
            });

        });

    },

    getProjects: function(req, res) {

        Project.find({}).sort('-year').exec((err, projects) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!projects) return res.status(404).send({ message: 'No hay projectos que mostrar.' });

            return res.status(200).send({ projects });
        });

    },

    saveProject: function(req, res) {

        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el documento.' });

            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto.' });

            return res.status(200).send({ project: projectStored });
        });
    },

    updateProject: function(req, res) {

        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {

            if (err) return res.status(500).send({ message: 'Error al actuallizar proyecto' });

            if (!projectUpdated) return res.status(404).send({ message: 'No existe projecto' });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    removeProject: function(req, res) {

        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {

            if (err) return res.status(500).send({ message: 'Error al eliminar proyecto' });

            if (!projectRemoved) return res.status(404).send({ message: 'No existe el projecto' });

            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    uploadImage: function(req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        console.log(req.files);

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            //Comprobar si la extension de imagen es valida
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });

                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe y no se ha asignado la imagen' });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extensión no es válida' });
                });
            }

        } else {
            return res.status(200).send({
                message: fileName
            });
        }

    },

    getImageFile: function(req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        const path = require('path');

        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(200).send({
                message: "No existe la imagen..."
            });
        }
    }

}

module.exports = controller;