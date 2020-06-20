/******************************************************************************
 *  @Purpose        : To create user controller to handle the incoming data. 
 *  @file           : user.controllers.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
const userService = require('../services/user.services');
const token = require('../token');
const sent = require('../middleware/nodemailer');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.registration = (req, res) => {
    try {
        var responseResult = {}
        userService.registration(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    try {
        var responseResult = {};
        userService.login(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sendResponse = (req, res) => {
    try {
        var responseResult = {};
        console.log('in user ctrl send token is verified response');
        userService.redirect(req.decoded, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log('in user ctrl token is verified giving response');
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getUser = (req, res) => {
    try {
        var responseResult = {};
        userService.getUserEmail(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
                console.log(payload);
                const obj = token.GenerateToken(payload);
                const url = `http://localhost:1996/resetPassword/${obj.token}`;
                sent.sendEMailFunction(url);
                res.status(200).send(url);
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setPassword = (req, res) => {
    try {
        var responseResult = {};
        console.log('in user ctrl send token is verified response');
        userService.resetpassword(req, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log('in user ctrl token is verified giving response');
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = (req, res) => {
    try {
        var responseResult = {}
        userService.getAllUsers((err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}