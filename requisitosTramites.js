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
                    'SELECT requisito,costo FROM public.procedimiento_ad_pre WHERE nombre=$1',
                    [nombreRequisito],
                    function(err, result) {
                        //
                        if (err) {
                            console.log(err);
                            callback('');
                        } 
                            console.log('Se esta enviando: ',result.rows);
                            if(result.rows.length>0){
                                callback('INDEFINIDO');
                            } else {
                                callback(result.rows);
                            }
                            
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
                    'SELECT * FROM procedimiento_ad_pre ORDER BY NOMBRE ASC',
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
    insertarTramitesPre: function(callback, datosProcedimiento) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Datos enviados a insertarTramite: ',datosProcedimiento);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    'INSERT INTO procedimiento_ad_pre (nombre,objetivo,responsabilidad,requisito,duracion,costo)'+
                    'VALUES ($1,$2,$3,$4,$5,$6)',
                    [
                        datosProcedimiento[0], 
                        datosProcedimiento[1],
                        datosProcedimiento[2],
                        datosProcedimiento[3],
                        datosProcedimiento[4],
                        datosProcedimiento[5]
                    ],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback([]);
                        } else {
                            callback([]);
                        };
                        done();
                    });
            
        });
        //pool.end();
    }
}