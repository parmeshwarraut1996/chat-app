/******************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : user.model.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
/**
 * Requiring Bcrypt to create hash of the user password stored in database
 **/
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let saltRounds = 10;
/**
 * Creating user schema using mongoose
 **/
const UserSchema = mongoose.Schema({
    FirstName: {
        type: String, require: [true, "FirstName require"]
    },
    LastName: {
        type: String, require: [true, "LastName require"]
    },
    Email: {
        type: String, require: [true, "Email require"]
    },
    Password: {
        type: String, require: [true, "Password require"]
    },
},
    {
        timestamps: true
    });
var user = mongoose.model('User', UserSchema);
function userModel() { }
/**
 * Saving data into database using the user schema
 **/
userModel.prototype.registration = (body, callback) => {
    /**
     * Find the user by Email in database if user with same Email exists
     **/
    user.find({ "Email": body.Email }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        }
        else {
            if (data > 0) {
                console.log("Email already exists");
                callback("User already present");
            }
            else {
                /**
                 * Create hash value of user password
                 **/
                body.Password = bcrypt.hashSync(body.Password, saltRounds);
                var newUser = new user({
                    "FirstName": body.FirstName,
                    "LastName": body.LastName,
                    "Email": body.Email,
                    "Password": body.Password,
                })
                newUser.save((err, result) => {
                    if (err) {
                        console.log("Model not found");
                        callback(err);
                    } else {
                        console.log("Registered Successfully");
                        callback(null, result);
                    }
                })
            }
        }
    });
}
/**
 * Finding user into database using the findOne()
 **/
userModel.prototype.login = (body, callback) => {
    console.log("model ", body.Password);
    user.findOne({ "Email": body.Username }, (err, result) => {
        if (err) {
            callback(err);
        }
        else if (result != null) {
            bcrypt.compare(body.Password, result.Password).then(function (res) {
                if (res) {
                    console.log("Login Succesfully");
                    callback(null, res);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        } else {
            console.log("invalid user");
            callback("invalid user");
        }
    });
}
/**
 * update the user password and store it in database
 */
userModel.prototype.updateUserPassword = (req, callback) => {
    let newPassword = bcrypt.hashSync(req.body.Password, saltRounds);
    console.log('new pass bcrypt--', newPassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { Password: newPassword }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
/**
 * Finding user email into database using the findOne()
 */
userModel.prototype.findUserEmail = (data, callback) => {
    user.findOne({ "Email": data.Email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.Email == result.Email) {
                callback(null, result);
            }
            else {
                callback("incorect mail")
            }
        }
    });
}
/**
 * get all users into the database using find()
 */
userModel.prototype.getAllUsers = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}
module.exports = new userModel();
