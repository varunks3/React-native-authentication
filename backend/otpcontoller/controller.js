const OTP = require("../model/otp")
const generateOTP = require("./generateOTP")
const sendEmail = require("./sendEmail")

const verifyOtp = async ({email, otp}) => {
    try{
        if(!(email && otp)){
            console.log("email or otp not provided")
        }
        const matchedOTP = await OTP.findOne({
            email,
        })
        if (!matchedOTP){
            console.log("otp not found")
        }
        const {expiresAt} = matchedOTP
        if (expiresAt < Date.now()){
            await OTP.deleteOne({email})
            throw Error("code has expired")
        }
        const validOTP = (otp == matchedOTP.otp)
        return validOTP
    }catch(error){
        console.log(error)
    } 
}
const sendOTP = async ({email, subject, message, duration = 1}) => {
    try {
        if(!(email && subject && message)){
            console.log('provide all required input')
        }
        await OTP.deleteOne({email})
        const generatedOTP = await generateOTP();
        let mailDetails = {
            from: process.env.MAIL_ADD,
            to: email,
            subject: subject,
            html: `<div> 
                    <p>${message}</p>
                    <p>Otp for  resetting password</p>
                    <p>${generatedOTP}</p> 
                </div>
                `,
        };
        
        await sendEmail(mailDetails);
        
        const newOTP = new OTP({
            email,
            otp: generatedOTP,
            createdAT: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord
    }catch(err){
        console.log("err")
    } 
}
const deleteOTP = async (email) => {
    try{
        await OTP.deleteOne({email});
    }catch(error){
        console.log(error)
    }
}
module.exports = {sendOTP , verifyOtp, deleteOTP}