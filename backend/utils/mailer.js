const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mariselvamk22601@gmail.com',
        pass: 'bqnv undv xazi ihsj'
    }
});

module.exports = transporter;