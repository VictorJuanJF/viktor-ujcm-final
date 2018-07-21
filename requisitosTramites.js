'use strict';
const request = require('request');
const config = require('./config');
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

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
        
    }
}