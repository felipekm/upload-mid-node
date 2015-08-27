/*jslint node:true*/
"use strict";

var multer = require('multer');

exports.check = function (requiredParams) {

    // returning middleware
    return function (req, res, next) {

        

        next();
    };
};

module.exports = exports;
