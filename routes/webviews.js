'use strict';

const config = require('../config');
const express = require('express');
const fbservice = require('../fb-service/fb-service');

const router = express.Router();

router.get('/webview', function(req, res) {
    res.render('register-form');
});

router.post('/save', function(req, res) {
    let body = req.query;
    let nombre = body.nombres;
    fbservice.sendTextMessage(body.psid, `Felicidades ${nombre} ! lo lograste`);

});

module.exports = router;