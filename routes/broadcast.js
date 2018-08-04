const config = require('../config');
const express = require('express');
const userService = require('../user');
const requisitos = require('../requisitosTramites');
const router = express.Router();
const fbService = require('../fb-service/fb-service');
const queries_user_estudiante = require('../queries_user_estudiante');



// router.get('/registro-estudiante', function(req, res) {
//     //     //res.send('Hello world, I am a chat bot')
//     res.render('register-form.ejs');
//     //     res.sendFile(__dirname   +'/index.html');
// });

router.post('/', function(req, res) {

    let datosRegistroEstudiantes = [];
    datosRegistroEstudiantes[0] = 'Derecho';
    datosRegistroEstudiantes[1] = req.body.codigo;
    datosRegistroEstudiantes[2] = req.body.nombres;
    datosRegistroEstudiantes[3] = req.body.apellidos;
    datosRegistroEstudiantes[4] = req.body.dni;
    datosRegistroEstudiantes[5] = req.body.email;
    datosRegistroEstudiantes[6] = req.user;
    queries_user_estudiante.insert_user_estudiante(function(callback) {}, datosRegistroEstudiantes);
    res.sendStatus(200);
});


router.get('/dashboard', function(req, res) {
    requisitos.listadoTramites(function(listadoRequisitos) {
        req.session.listadoRequisitos = listadoRequisitos;
        res.render('dashboard', { listadoRequisitos: listadoRequisitos });
    });

});

router.post('/dashboard', function(req, res) {

    var datosProcedimiento = [];
    datosProcedimiento[0] = req.body.nombre;
    datosProcedimiento[1] = req.body.objetivo;
    datosProcedimiento[2] = req.body.responsabilidad;
    datosProcedimiento[3] = req.body.requisito;
    datosProcedimiento[4] = req.body.duracion;
    datosProcedimiento[5] = req.body.costo;
    requisitos.insertarTramitesPre(function(callback) {}, datosProcedimiento);
    res.sendStatus(200);
});

router.get('/no-access', function(req, res) {
    res.render('no-access');
});

router.get('/broadcast', ensureAuthenticated, function(req, res) {
    res.render('broadcast', { user: req.user });
});

router.post('/broadcast', ensureAuthenticated, function(req, res) {
    let message = req.body.message;
    let newstype = parseInt(req.body.newstype, 10);
    req.session.newstype = newstype;
    req.session.message = message;
    userService.readAllUsers(function(users) {
        req.session.users = users;
        res.render('broadcast-confirm', { user: req.user, message: message, users: users, numUsers: users.length, newstype: newstype })
    }, newstype);


});

router.get('/broadcast-send', ensureAuthenticated, function(req, res) {
    let message = req.session.message;
    let allUsers = req.session.users;

    let sender;
    for (let i = 0; i < allUsers.length; i++) {
        sender = allUsers[i].fb_id;
        fbService.sendTextMessage(sender, message);
    }

    res.redirect('/broadcast-sent');
});

router.get('/broadcast-sent', ensureAuthenticated, function(req, res) {
    let newstype = req.session.newstype;
    let message = req.session.message;
    let users = req.session.users;

    req.session.newstype = null;
    req.session.message = null;
    req.session.users = null;
    //res.render('/broadcast-sent');
    res.render('broadcast-sent', { message: message, users: users, numUsers: users.length, newstype: newstype });
});

router.get('/logout', ensureAuthenticated, function(req, res) {
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        //if (req.user.id === config.ADMIN_ID ) {
        return next();
        // }
        // res.redirect('/broadcast/no-access');
    } else {
        res.redirect('/');
    }
}


module.exports = router;