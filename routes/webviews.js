'use strict';

const config = require('../config');
const express = require('express');
const fbservice = require('../fb-service/fb-service');
const queries_user_estudiante = require('../queries_user_estudiante');

const router = express.Router();

//Se carga el webview con el formulario estudiante
router.get('/webview', function(req, res) {
    res.render('register-form');
});
//Se carga el webview con el formulario para foraneos a la U 
router.get('/webview-2', function(req, res) {
    res.render('register-form-foraneo');
});

router.get('/save', function(req, res) {
    let body = req.query;
    let nombre = body.nombres;
    var datosRegistroEstudiantes = [];
    datosRegistroEstudiantes[0] = body.codigo;
    datosRegistroEstudiantes[1] = body.nombres;
    datosRegistroEstudiantes[2] = body.apellidos;
    datosRegistroEstudiantes[3] = body.dni;
    datosRegistroEstudiantes[4] = body.email;
    datosRegistroEstudiantes[5] = body.Escuela;
    datosRegistroEstudiantes[6] = body.psid;
    datosRegistroEstudiantes[7] = body.broadcast;
    queries_user_estudiante.insert_update_user_estudiante(function(callback) {}, datosRegistroEstudiantes);
    fbservice.sendTextMessage(body.psid, `Felicidades ${nombre}! ya estás registrado 🤗tu ID es ${body.psid}`);
    console.log(res.sendStatus(200));

});

router.get('/settings', function(req, res) {

    queries_user_estudiante.list_user_estudiante(function(result) {
        let settings = [];
        settings = result[0];
        res.json(settings);
    }, req.query.psid);


});

module.exports = router;