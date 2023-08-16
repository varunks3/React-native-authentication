const nodemailer = require("nodemailer")

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PASS,
    }
});

const sendEmail = async(mailDetails) => {
    try{
        await mailTransporter.sendMail(mailDetails)
        return;
    }catch (error){
        console.log("failed to send mail")
    }
}

module.exports = sendEmail;