module.exports = {
    mailOptions: {
        from: 'protraqapp2022@gmail.com',
        to: 'to@email.com',
        subject: 'Subject of your email',
        html: '<p>Your html here</p>'
    },
    emailconfig: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'protraqapp2022@gmail.com',
            pass: 'fshmkeqobrzffovy'
        }
    },
}