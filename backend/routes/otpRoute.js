const express = require('express');
const router = express.Router();
const {sendOTP} = require("../otpcontoller/controller")

router.post('/otp', async (req, res) => {
  try {
   const {email, subject, message, duration} = req.body
   const createdOTP = await sendOTP({
    email,
    subject,
    message,
    duration,
   })
   res.status(200).send(`createdOTP successfully, ${createdOTP}`)
  } catch (error) {
    console.log("route error")
  }
});


module.exports = router;
