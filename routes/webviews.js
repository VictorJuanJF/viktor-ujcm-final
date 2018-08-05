'use strict';

const config = require('../config');
const express = require('express');
const fbservice = require('../fb-service/fb-service');
const queries_user_estudiante = require('../queries_user_estudiante');

const router = express.Router();

router.get('/webview', function(req, res) {
    res.render('register-form');
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
    queries_user_estudiante.insert_user_estudiante(function(callback) {}, datosRegistroEstudiantes);
    fbservice.sendTextMessage(body.psid, `Felicidades ${nombre}! lo lograste tu fb ID es ${body.psid}`);

});

router.get('/settings', function(req, res) {

    queries_user_estudiante.list_user_estudiante(function(result) {
        let settings = [];
        settings = result[0];
        res.json(settings);
    }, req.query.psid);


});

module.exports = router;