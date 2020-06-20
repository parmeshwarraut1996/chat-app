/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to user_model and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : user.services.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
const userModel = require('../application/model/user.model')
/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.login = (data, callback) => {
    try {
        userModel.login(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            }
            else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.registration = (data, callback) => {
    try {
        userModel.registration(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            }
            else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}/**
 * 
 * @param {*} decoded 
 * @param {*} callback 
 */
exports.redirect = (decoded, callback) => {
    userModel.confirmUser(decoded, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.getUserEmail = (data, callback) => {
    try {
        userModel.findUserEmail(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} callback 
 */
exports.resetpassword = (req, callback) => {
    try {
        userModel.updateUserPassword(req, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.getAllUsers = (data, callback) => {
    userModel.getAllUsers(data, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    })

}