'use strict';
const request = require('request');
const config = require('./config');
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

    //
    actualizarTramitesPre: function(callback, setting, userId) {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log('Se entro a newsletterSettings de user.js');
            client
                .query(
                    'UPDATE procedimiento_ad_pre SET newsletter=$1 WHERE fb_id=$2',
                    [setting, userId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(false);
                        } else {
                            callback(true);
                        };
                        done();
                    });
            
        });
        //pool.end();
    },

    //Read

    leerTramitesPre: function(callback,nombreRequisito) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Se entro a requisitosTramites.js');
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    'SELECT requisito FROM public.procedimiento_ad_pre WHERE nombre=$1',
                    [nombreRequisito],
                    function(err, result) {
                        //
                        if (err) {
                            console.log(err);
                            callback('');
                        } 
                            console.log('Se esta enviando: ',result.rows[0]['requisito']);
                            callback(result.rows[0]['requisito']);
                            done();
                        
                    });
                   // assert(client.release === release)
                    
        });
        
    },

    listadoTramites: function(callback) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Se entro a listadoTramites');
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    'SELECT * FROM public.procedimiento_ad_pre',
                    function(err, result) {
                        //
                        if (err) {
                            console.log(err);
                            callback([]);
                        } 
                            console.log('Se esta enviando: ',result.rows);
                            callback(result.rows);
                            done();
                        
                    });
                   // assert(client.release === release)
                    
        });
        
    },

    //Update
    insertarTramitesPre: function(callback, setting, userId) {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log('Se entro a newsletterSettings de user.js');
            client
                .query(
                    'UPDATE users SET newsletter=$1 WHERE fb_id=$2',
                    [setting, userId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(false);
                        } else {
                            callback(true);
                        };
                        done();
                    });
            
        });
        //pool.end();
    }
}