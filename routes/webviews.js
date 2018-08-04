'use strict';

const config = require('../config');
const express = require('express');
const fbservice = require('../fb-service/fb-service');

const router = express.Router();

router.get('/webview', function(req, res) {
    res.render('register-form');
});

router.get('/save', function(req, res) {
    let body = req.query;
    let nombre = body.nombres;
    let datosRegistroEstudiantes = [];
    datosRegistroEstudiantes[0] = body.codigo;
    datosRegistroEstudiantes[1] = body.nombres;
    datosRegistroEstudiantes[2] = body.apellidos;
    datosRegistroEstudiantes[3] = body.dni;
    datosRegistroEstudiantes[4] = body.email;
    datosRegistroEstudiantes[5] = body.carrera;
    datosRegistroEstudiantes[6] = body.psid;
    datosRegistroEstudiantes[7] = user.broadcast;
    queries_user_estudiante.insert_user_estudiante(function(callback) {}, datosRegistroEstudiantes);
    fbservice.sendTextMessage(body.psid, `Felicidades ${nombre}! lo lograste tu fb ID es ${body.psid}`);

});

module.exports = router;