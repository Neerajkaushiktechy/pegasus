const nodemailer = require('nodemailer');
const config = require('../utils/config');
var handlebars = require('handlebars');
const fs = require('fs');
var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
            throw err;

        }
        else {
            callback(null, html);
        }
    });
};

const MailService = (myobj, status) => {

    const transporter = nodemailer.createTransport(config.emailconfig);
    const configMailOptions = config.mailOptions;
    const replacements = {
        email: myobj?.email,
        password: myobj?.password
    };
    if (myobj?.schoolId) {
        replacements.schoolId = myobj?.schoolId
    }
    if (status === 'sendToStudent') {
        readHTMLFile(
            __dirname +
            `/../resources/emailTemplates/${status}.html`,
            function (err, html) {
                var template = handlebars.compile(html);
                const htmlToSend = template(replacements);
                const mailOptions = {
                    ...configMailOptions,
                    subject: myobj.subjectOfEmail,
                    to: myobj.email,
                    html: htmlToSend,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log("[ERROR INDIVIDUAL]: ", err);
                        return err;
                    } else {
                        console.log("[INFO INDIVIDUAL]: ", info);
                        return info;
                    }
                });
            }
        );

    }
    else if (status === 'sendToSchool') {
        readHTMLFile(
            __dirname +
            `/../resources/emailTemplates/${status}.html`,
            function (err, html) {
                var template = handlebars.compile(html);
                const htmlToSend = template(replacements);
                const mailOptions = {
                    ...configMailOptions,
                    subject: myobj.subjectOfEmail,
                    to: myobj.email,
                    html: htmlToSend,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log("[ERROR INDIVIDUAL]: ", err);
                        return err;
                    } else {
                        console.log("[INFO INDIVIDUAL]: ", info);
                        return info;
                    }
                });
            }
        );

    }

    else if (status === 'forgot-password') {
        const { data } = myobj
        const url = `${process.env.REACT_APP_LOCAL_API_URL}reset-password/${data?.email}/${data?.user_id}/${data?.roleId}/${data?.token}`
        readHTMLFile(
            __dirname +
            `/../resources/emailTemplates/${status}.html`,
            function (err, html) {
                var template = handlebars.compile(html);
                const htmlToSend = template({ url });
                const mailOptions = {
                    ...configMailOptions,
                    subject: myobj.subjectOfEmail,
                    to: myobj.email,
                    html: htmlToSend,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log("[ERROR INDIVIDUAL]: ", err);
                        return err;
                    } else {
                        console.log("[INFO INDIVIDUAL]: ", info);
                        return info;
                    }
                });
            }
        );

    }

};

module.exports = MailService;