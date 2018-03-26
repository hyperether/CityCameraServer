var express = require("express");
var Q = require('q');
var multer = require("multer"); //is midleware for handling multipart/form-data,(primarily used for uploading files)
var moment = require("moment"); //is js library for parsing, manipulating, validating and formating data
var fs = require("fs");
var path = require("path"); //This module contains utilities for handling and transforming file paths.
var folders = require('../../../lib/db/model/folders');

var storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, config.file.destination) + "/");
    },
    filename: function (req, file, callback) {

        var findExt = file.originalname.lastIndexOf(".");
        var ext = file.originalname.substring(findExt);

        file.originalname = req.params.fileId + ext;
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("userphoto");

exports.upload = function (req, res) {
    var deferred = Q.defer();

    var fileId = req.params.fileId;
    var status = true;

    upload(req, res, function (err, data) {
        if (err) {
            logger.error('ERROR Local storage - Upload img ', err);
            deferred.reject(err);
        }
        folders.updateStatus(fileId, status).then(function (data) {
            deferred.resolve(data);
        })

    });
    return deferred.promise;
};

exports.getUploadURL = function (fileId) {
    var deferred = Q.defer();

    deferred.resolve((process.env.SERVER_URL || config.serverURL) + '/file/' + fileId + '/upload');

    return deferred.promise;
};

exports.deleteFile = function (fileId, fileExt) {
    var deferred = Q.defer();

    fs.unlink(path.join(__dirname, config.file.destination) + "/" + fileId + '.' + fileExt, function (err) {
        if (err) {
            logger.error('ERROR Local storage - delete', err);
            return deferred.reject(err);
        } else {
            folders.deleteFileByUser(fileId).then(function (data) {
                deferred.resolve(data);
            });
        }
    });

    return deferred.promise;
};