require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailService{
    constructor(){

    }

    async sendEmail(mailOptions) {
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // replace with your SMTP host
            port: process.env.MAIL_PORT, // replace with your SMTP port
            secure: false, // false for port 587
            auth: {
                user: process.env.MAIL_LOGIN, // replace with your email
                pass: process.env.MAIL_PASSWORD, // replace with your email password
            },
            tls: {
                rejectUnauthorized: false,
                minVersion: 'TLSv1.2' // Ensure using TLSv1.2 or later
            },
        });
    
        // Verify the transporter configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
    
        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
    
}

module.exports = EmailService