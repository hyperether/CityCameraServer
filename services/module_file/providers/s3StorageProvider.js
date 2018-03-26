var express = require('express');
var Q = require('q');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var folders = require('../../../lib/db/model/folders');

var AWS_KEY = process.env.AWS_KEY;
var AWS_SECRET = process.env.AWS_SECRET;
var AWS_REGION= process.env.AWS_REGION;
var AWS_BUCKET= process.env.AWS_BUCKET;

AWS.config.update({accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET, region: AWS_REGION});

var s3 = new AWS.S3({
    signatureVersion: "v4"
});

exports.getUploadURL = function (fileId, fileExt) {
    var deferred = Q.defer();

    var options = {
        Bucket: AWS_BUCKET,
        Key: fileId + '.' + fileExt,
        Expires: 600, //600 sec
        ContentType: 'multipart/form-data',
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', options, function (err, url) {
        if (err) {
            logger.error('ERROR S3 storage - get Signed Url', err);
            return deferred.reject(err);
        }

        deferred.resolve(url);
    });

    return deferred.promise;
};

exports.deleteFile = function (fileId, fileExt) {
    var deferred = Q.defer();

    var urlParams = {
        Bucket: AWS_BUCKET,
        Key: fileId + '.' + fileExt
    };

    s3.deleteObject(urlParams, function (err, data) {
        if (err) {
            logger.error('ERROR S3 storage - delete', err);
            return deferred.reject(err);
        } else {
            folders.deleteFileByUser(fileId).then(function (data) {
                deferred.resolve(data);
            });
        }
    });

    return deferred.promise;
};