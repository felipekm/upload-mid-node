/*jslint node:true*/
/*global require, global, console */

'use strict';

var express         = require('express'),
    upload_mid_node = require('../lib/uploadmidnode.js');

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

app.get('/ping', function (req, res) {
    res.send('Foo');
});

app.post(
    '/test',
    upload_mid_node.check({
        options: global.config.public_folders.integra.docs,
        supportedFileExt: ['txt', 'doc'],
        multiFiles: false
    }),
    function (req, res) {
        console.log('OK');
        res.status(200).send('OK:');
    }
);

app.listen(3000, function () {
    console.log('Up and running on port 3000');
});
