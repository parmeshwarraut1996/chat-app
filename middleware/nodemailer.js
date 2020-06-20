/******************************************************************************
 *  @Purpose        : Create nodemailer to allow easy as cake email sending . 
 *  @file           : nodemailer.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
const nodemailer = require('nodemailer');
/**
* Here we are configuring our SMTP Server details.
* SMTP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userName,
            pass: process.env.Password
        },
    });
    const mailOptions = {
        from: process.env.userName,          // sender address
        to: process.env.userName,           // list of receivers
        subject: 'node.js(bridgelabz)',    // Subject line
        text: 'Your Email verification link is:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log('error while sending mails-- ', err);
        else
            console.log('result on sending mails-- ', info);
    });
}