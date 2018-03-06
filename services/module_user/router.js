var controller = require('./controller');
var express = require('express');
var secMidd = require('../../middleware/securityMiddleware');
var router = express.Router();


/**
 * @api {post} /user/register
 * Register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup User
 * @apiDescription Register new User
 *
 * @apiParam (body){String} username User Username
 * @apiParam (body){String} email User email
 * @apiParam (body){String} password User password

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        {
             success: true
        }
 *
 * @apiUse internalError
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */

router.post('/register',controller.register);
/**
 * @api {post} /user/login
 * Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup User
 * @apiDescription Login user
 *
 * @apiParam (body){String} username User Username
 * @apiParam (body){String} password User password
 * 
 * @apiSuccess {Boolean} isAdmin Is user admin (true) or user (false)
 * 
 * 
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        { token: 'eyJ0eXAiOiJKV1QiLCJhbGci...',
        user: 
        { _id: 5a9663a666c7371af947d93c,
            password: '1234',
            username: 'cordiaca',
            email: 'jj_ivezic@yahoo.com',
            isAdmin: false,
            token: 'eyJ0eXAiOiJKV1QiL...' } }
        *
 * @apiUse internalError
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */
router.post('/login',controller.login);
/**
 * @api {get} /user/list
 * All users
 * @apiVersion 1.0.0
 * @apiName All users
 * @apiGroup Admin
 * @apiDescription List all users
 *
 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        [
            { 
                _id: 5a9663a666c7371af947d93c,
                password: '1234',
                username: 'cordiaca',
                email: 'jj_ivezic@yahoo.com',
                isAdmin: true 
            },
            { 
                _id: 5a9666fcfe5354220351ab98,
                password: '123',
                username: 'test',
                email: 'test@yahoo.com',
                isAdmin: false
            },
            { 
                _id: 5a966747fcf034225110e0ec,
                password: '1234',
                username: 'jelena',
                email: 'ivezic@yahoo.com',
                isAdmin: false 
        }
     ]

 * @apiUse internalError
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */
router.get('/list',secMidd.checkTokenAdmin, controller.listAllUsers);


router.post('/login',controller.login);
/**
 * @api {put} /user/{user_id}
 * Update user
 * @apiVersion 1.0.0
 * @apiName Update user
 * @apiGroup Admin
 * @apiDescription Update user
 *
 * @apiParam (path) {String} user_id UserId
 * 
 * @apiParam (body){Boolean}  isAdmin Is user admin (true) or user (false)


 *@apiHeader {String} x-access-token trader token for api authentication

 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
            { 
                _id: 5a9663a666c7371af947d93c,
                password: '1234',
                username: 'cordiaca',
                email: 'jj_ivezic@yahoo.com',
                isAdmin: true 
            },


 * @apiUse internalError
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */
router.put('/:user_id',secMidd.checkTokenAdmin, controller.updateUser);
module.exports = router;