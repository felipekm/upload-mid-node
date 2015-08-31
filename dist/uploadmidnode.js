/*jslint node:true*/
/*global require, global, console */

var formidable = require('formidable'),
    util       = require('util'),
    fs         = require('fs-extra');

exports.check = function (param) {

    "use strict";

    return function (req, res, next) {

        console.log('PARAMS: ', param);

        // Validate mandatory options
        if (!param.options || !param.options.path || !param.supportedFileExt || !param.options.limitSize) {
            return res.status(500).send({error: 'Expecting [options.limitSize, options.path, supportedFileExt] on request'});
        }

        var form      = new formidable.IncomingForm(),
            path      = param.options.path,
            temp_path = './temp/';

        // Set multiple files
        form.multiples = param.options.multiple || false;

        // Max size
        form.maxFieldsSize = param.options.limitSize;

        // Will keep file extension
        form.keepExtensions = true;

        // Set uploads temp folder
        form.uploadDir = temp_path;

        // Ensure folders
        fs.ensureDir(temp_path);
        fs.ensureDir(path);

        // When the process ends
        form.on('end', function () {

            req.uploads = [];

            // Change original filename
            this.openedFiles.forEach(function (file) {

                file.name = file.path.split('upload_')[1];
                console.log(file.name);

                fs.copy(file.path, path + '/' + file.name, function (err) {
                    if (err) {
                        return res.status(500).send({error: util.inspect(err)});
                    }

                    console.log('File: ' + file.name + ' - Uploaded');

                    fs.removeSync(file.path, function () {
                        req.uploads.push(file);
                    });

                    next();

                });

            });

        });

        // Error Handling
        form.on('error', function (err) {
            console.log('Error', err);
            return res.status(500).send({ error: util.inspect(err) });
        });

        form.parse(req, function () { console.log('foo'); });

    };
};

module.exports = exports;
