/* jslint node:true */
'use strict';

var path = require('path');
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.listen(port);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
        if (err) {
            res.status(err.status).end();
        }
    });
});

app.get('/:dateparam', function (req, res) {
    var param = req.params.dateparam;
    var d;

    if (!isNaN(parseInt(param))) {
        param = parseInt(param) * 1000;
    } 
    
    d = new Date(param);

    console.log('Request param ' + req.params.dateparam);
    if (typeof d === 'object' && !isNaN(d.getTime())) {
        res.json({
            'unix': d.getTime(),
            'natural': months[d.getMonth()] + ' ' + d.getDate() +', ' + d.getFullYear()
        });
    } else {
        res.json({
            'unix': null,
            'natural': null
        });
    }
});
