/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : routes.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controllers");
const chatControllers = require("../controllers/chat.controllers");
const middle = require('../middleware/authentication')
router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.post('/verifyUser', userController.getUser);
router.post('/resetpassword/:token', middle.checkToken, userController.setPassword);
router.post('/addMessage', chatControllers.addMessage);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllChats', chatControllers.getAllUserChats);
module.exports = router;