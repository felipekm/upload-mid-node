/*jslint node:true*/
/*global require, global, console */

var formidable = require('formidable'),
    util       = require('util'),
    fs         = require('fs-extra'),
    uuid       = require('node-uuid');

exports.check = function (param) {

    "use strict";

    return function (req, res, next) {

        // Validate mandatory options
        if (!param.options.path || !param.supportedFileExt || !param.options.limitSize) {
            return res.status(500).send({error: '[ERROR] - Expecting [options.limitSize, options.path, supportedFileExt] on request'});
        }

        console.log('PARAMS');
        console.log(param);

        var supportedFileExt = param.supportedFileExt,
            form      = new formidable.IncomingForm(),
            limit     = param.options.limitSize,
            path      = param.options.path,
            temp_path = './temp/';

        // Set multiple files
        form.multiples = param.multiFiles || false;

        // Will keep file extension
        form.keepExtensions = true;

        // Set uploads temp folder
        form.uploadDir = temp_path;

        // Ensure folders
        fs.ensureDir(temp_path);
        fs.ensureDir(path);

        // When start the parse
        form.on('fileBegin', function (name, file) {
            console.log('begin');
            console.log(file);
            console.log(name);

            // File name change
            // var fileExtension = file.name.split('.')[1],
            //     filename = file.name.split('.')[0];
            //
            // file.name = uuid.v1() + '.' + fileExtension;
        });

        // When the process ends
        form.on('end', function (fields, files) {


            if (this.openedFiles.length > 0) {
                fs.copy(this.openedFiles[0].path, path + '/' + this.openedFiles[0].name, function(err) {
                    if (err) {
                        return res.status(500).send({error: util.inspect(err)});
                    } else {
                        console.log('> Upload done');
                        next();
                    }
                });
            } else {
                console.log('No File');
                return res.status(500).send('No File');
            }

            //next();
        });

        // Error Handling
        form.on('error', function (err) {
            console.log('Error', err);
            return res.status(500).send({error: util.inspect(err)});
        });

        form.parse(req, function(err, field, files) {

            if (!files || !files.hasOwnProperty('file')) {
                //return res.status(500).send({error: '[ERaeeaaeROR] - File not found'});
            }

            if (files.file) {
                // Validating file size
                if (files.file.size < 1) {
                    return res.status(500).send({error: '[ERROR] - The file is too big, the limit is: ' + limit + ' bytes'});
                }
            }

        });

    };
};

module.exports = exports;
