/******************************************************************************
 *  @Purpose        : To create chat services that will send the incoming data 
                    to chat_model and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : chat.services.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
const chatModel = require('../application/model/chat.model')
/**
 * 
 * @param {*} req 
 * @param {*} callback 
 */
exports.addMessage = (req, callback) => {
    chatModel.addMessage(req, (err, result) => {
        if (err) {

            return callback(err);
        } else {

            return callback(null, result);
        }
    })
}/**
 * 
 * @param {*} req 
 * @param {*} callback 
 */
exports.getAllUserChats = (req, callback) => {
    chatModel.getAllUserChats(req, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}