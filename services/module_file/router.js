var controller = require('./controller');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var secMidd = require('../../middleware/securityMiddleware');


//router.put('/uploadedAmazon', controller.uploadedToAmazon);

/**
 * @api {post} /file/{fileId}/upload
 * Upload img -local
 * @apiVersion 1.0.0
 * @apiName Upload Localy
 * @apiGroup User
 * @apiDescription Upload img to local folder
 * 
 * @apiParam (path) {String} fileId File id
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        {
        isSuccess: true,
        message: 'Image uploaded!'
        }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.post('/:fileId/upload', controller.upload);

/**
 * @api {post} /file/{userId}/getUploadURL
 * Link for upload img Amazon or local
 * @apiVersion 1.0.0
 * @apiName Link upload Amazon
 * @apiGroup User
 * @apiDescription Link for upload img to Amazon or to local
 * 
 * @apiParam (path) {String} userId User id
 * @apiParam (body){String} file File name
 * @apiParam (body){String} ext File extension
 * 
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        { fileId: 5a96a20bf5738b614b38af49,
         url: 'https://citycamera.s3.eu-central-1.amazonaws.com/5a96a20bf5738b614b38af49.jpg?Content-Type...'
         }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.post('/:userId/getUploadURL', controller.getUploadURL);


/**
 * @api {get} /file/folders
 * All folders
 * @apiVersion 1.0.0
 * @apiName All folders
 * @apiGroup Admin
 * @apiDescription List all folders from all users
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
         {
              folders: [ '2018-01-28', '2018-02-28' ] 
         }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.get('/folders', secMidd.checkTokenUser, controller.folders);
/**
 * @api {get} /file/folders/{userId}
 * All Folders 
 * @apiVersion 1.0.0
 * @apiName Folders by id
 * @apiGroup User
 * @apiDescription List all folders for user
 * 
 * @apiParam (path) {String} userId User id
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
         { 
             folders: [ '2018-01-28', '2018-02-28' ] 
         }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.get('/folders/:userId', secMidd.checkTokenUser, controller.foldersByUserId);
/**
 * @api {get} /file/{folder}/files/
 * Get all files for folder
 * @apiVersion 1.0.0
 * @apiName All files admin
 * @apiGroup Admin
 * @apiDescription List all files from one folder
 * 
 * @apiParam (path) {String} folder Folder name
 * 
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
         { files: 
            [ { _id: 5a9682e08ee3183e8e6666bf,
                userId: '5a9666fcfe5354220351ab98',
                filename: 'testimg',
                status: true,
                updated: 2018-02-28T10:22:24.609Z,
                ext: 'jpg',
                folder: '2018-02-28' },
                { _id: 5a968f283ab01f4fd79b7546,
                userId: '5a966xgf56464776868866',
                filename: 'img3',
                status: true,
                updated: 2018-02-28T11:14:48.073Z,
                ext: 'jpg',
                folder: '2018-02-28' } 
            ],
        path: null 
        }

 * @apiUse internalError
 * @apiUse badRequest
 */
router.get('/:folder/files/', secMidd.checkTokenUser, controller.files);
/**
 * @api {get} /file/{userId}/{folder}/files/
 * All files
 * @apiVersion 1.0.0
 * @apiName All files
 * @apiGroup User
 * @apiDescription List all files from one folder by user id
 * 
 * @apiParam (path) {String} folder Folder name (date format)
 * @apiParam (path) {String} userId User id
 * 
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
         { files: 
            [ { _id: 5a9682e08ee3183e8e6666bf,
                userId: '5a9666fcfe5354220351ab98',
                filename: 'testimg',
                status: true,
                updated: 2018-02-28T10:22:24.609Z,
                ext: 'jpg',
                folder: '2018-02-28' },
                { _id: 5a968f283ab01f4fd79b7546,
                userId: '5a9666fcfe5354220351ab98',
                filename: 'img3',
                status: true,
                updated: 2018-02-28T11:14:48.073Z,
                ext: 'jpg',
                folder: '2018-02-28' } 
            ],
        path: null 
        }

 * @apiUse internalError
 * @apiUse badRequest
 */
router.get('/:userId/:folder/files/', secMidd.checkTokenUser, controller.filesByUserId);

/**
 * @api {delete} /file/{userId}/delete/{fileId}
 * Delete file
 * @apiVersion 1.0.0
 * @apiName Delete file
 * @apiGroup User
 * @apiDescription Delete file 
 * 
 * @apiParam (path) {String} userId User id
 * @apiParam (path) {String} fileId FileId id
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
         {
            success: true
         }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.delete('/:userId/delete/:fileId', secMidd.checkTokenUser, controller.deleteFile);

/**
 * @api {delete} /file/{userId}/delete/{fileId}
 * Delete file by admin
 * @apiVersion 1.0.0
 * @apiName Delete file admin
 * @apiGroup Admin
 * @apiDescription Delete file by admin
 * 
 * @apiParam (path) {String} fileId FileId id
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
           {
            success: true
   
            }
 * @apiUse internalError
 * @apiUse badRequest
 */
router.delete('/delete/:fileId', secMidd.checkTokenAdmin, controller.adminDeleteFile);
module.exports = router;
