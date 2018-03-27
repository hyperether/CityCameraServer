var error    = require('../../lib/error').error;
var provider = require('./providers/');
var folders  = require('../../lib/db/model/folders');
var users    = require('../../lib/db/model/users');
var moment   = require("moment");

exports.upload = function (req, res, next) {
  provider.upload(req, res).then(function (data) {
    res.status(200);
    res.json({
      isSuccess: true,
      message: 'Image uploaded!'
    });
    //TODO added confirmation update in DB
  }).fail(function (err) {
    logger.error('ERROR CTRL - upload img', err);
    return next(err);
  });
};

exports.getUploadURL = function (req, res, next) {

  var fileName = req.body.file;
  var fileExt  = req.body.ext;
  var userId   = req.params.userId;

  folders.saveFile({
    userId: userId,
    filename: fileName,
    ext: fileExt,
    folder: moment().format('YYYY-MM-DD')
  }).then(function (saved) {
    provider.getUploadURL(saved._id, fileExt).then(function (url) {
      res.json({fileId: saved._id, url: url});
    }).fail(function (err) {
      logger.error('ERROR CTRL - get URL to upload', err);
      return next(err);
    });
  }).fail(function (err) {
    logger.error('ERROR Local storage - get URL to upload ', err);
    return next(err);
  });
};

exports.folders = function (req, res, next) {

  var userId   = req.params.userId;

  users.findById(userId).then(function (user) {
    if (!user) return next(error('NOT_FOUND'));

    var method;

    if (user.isAdmin) method = 'returnAllFolders';
    else method = 'retrunFoldersByUserId';

    folders[method](userId).then(function (folders) {
      res.json({
        folders: folders
      });
    }).fail(function (err) {
      logger.error('ERROR list all folders ', err);
      return next(err);
    });

  }).fail(function (err) {
    logger.error('ERROR finding user=' + userId, err);
    return next(err);
  })
};


exports.files = function (req, res, next) {

  var userId = req.params.userId;
  var folder = req.params.folder;

  users.findById(userId).then(function (user) {
    if (!user) return next(error('NOT_FOUND'));

    var method;

    if (user.isAdmin) method = 'retrunAllFiles';
    else method = 'retrunFilesByUserId';

    folders[method](folder).then(function (files) {
      res.json(files);
    }).fail(function (err) {
      logger.error('ERROR list all files', err);
      return next(err);
    });


  }).fail(function (err) {
    logger.error('ERROR finding user=' + userId, err);
    return next(err);
  })

};

exports.deleteFile = function (req, res, next) {

  var fileId = req.params.fileId;
  var userId = req.params.userId;

  users.findById(userId).then(function (user) {
    if (!user) return next(error('NOT_FOUND'));

    folders.findById(fileId).then(function (file) {
      if (!file) return next(error('NOT_FOUND'));

      if (!user.isAdmin && file.userId != userId) return next(error('FORBIDDEN'));

      provider.deleteFile(file._id, file.ext).then(function (err) {
        res.json({
          success: true
        });
      }).fail(function (err) {
        logger.error('ERROR provider deleting file', err);
        return next(err);
      });

    }).fail(function (err) {
      logger.error('ERROR finding file for id=' + fileId, err);
      return next(err);
    })
  }).fail(function (err) {
    logger.error('ERROR finding user=' + userId, err);
    return next(err);
  })
};