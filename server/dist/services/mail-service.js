"use strict";
var nodemailer = require('nodemailer');
var MailService = /** @class */ (function () {
    function MailService() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            domain: process.env.SMTP_DOMAIN,
            authentication: process.env.SMTP_AUTHENTICATION,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    MailService.prototype.sendActivationMail = function (to, link) {
        this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: " \n                    <div>\n                        <h1>\u0414\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u043F\u0440\u043E\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435</h1>\n                        <a href=\"".concat(link, "\">").concat(link, "</a>\n                    </div>\n                ")
        }, function () {
            console.log('mail was send');
        });
    };
    ;
    return MailService;
}());
module.exports = new MailService();
