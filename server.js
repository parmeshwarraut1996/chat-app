/******************************************************************************
 *  @Purpose        : To create a server to connect with front end for getting 
                    request and sending response to client
 *  @file           : server.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
/**
 *  To give path to each file
 **/
const router = require('./routes/routes');
const express = require('express');
/**
 * Parse the JSON request body
 **/
var bodyParser = require('body-parser');
const chatControllers = require("./controllers/chat.controllers")
/**
 * create express app
 */
const app = express();
/**
 * To get the path of database
 **/
const databaseConfig = require('./configuration/database.configuration');
/**
 * .env is used for 
 */
require('dotenv').config();
const mongoose = require('mongoose');
/**
 * to connect server
 */
require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }))
/**
 * parse requests of content-type - application/json
 **/
app.use(bodyParser.json())
app.use('/', router);
/**
 *  Configuring the database
 **/
mongoose.Promise = global.Promise;
/**
 * Connecting to the database
 **/
mongoose.connect(databaseConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    /**
     * Promise is fullfilled
     **/
    console.log("Successfully connected to the database");
}).catch(err => {
    /**
     * Promise is rejected
     **/
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
/**
 * define a simple route
 **/
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to chatApp" });
});
/**
 * listen for requests
 */
const server = app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
/**
 * socket connection
 */
const io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
    connections = [];
    connections.push(socket)
    console.log("user connected")
    socket.on('new_msg', function (req) {
        console.log("req in server js======>",req);
        chatControllers.addMessage(req, (err, result) => {
            if (err) {
                console.log("error on server while receiving data");
            }
            else {
               // socket.io.emit('emitMsg', result);
            }
            io.emit(req.recieverId, result);
            io.emit(req.senderId,result);
        })
    })
})
/**
 * socket Disconnect
 **/
io.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log("user disconnected");

})