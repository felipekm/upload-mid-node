/*jslint node:true, unparam: true*/
/*global require, global, console */

'use strict';

var express         = require('express'),
    upload_mid_node = require('../lib/upload-mid-node');

var app = express();

global.config = {
    public_folders: {
        integra: {
            docs: {
                path: "./public/documents",
                limitSize: 20000000
            }
        }
    }
};

app.get('/', function (req, res) {
    res.send('Ok');
});

app.post(
    '/upload',
    upload_mid_node.check({
        options: global.config.public_folders.integra.docs,
        supportedFileExt: ['txt', 'doc'],
        multiFiles: false
    }),
    function (req, res) {
        console.log('OK');
        console.log('Uploaded Files: ', req.uploads);

        res.status(200).send(req.uploads);
    }
);

app.listen(3000, function () {
    console.log('Up and running on port 3000');
});
