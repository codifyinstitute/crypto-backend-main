const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Function to generate a 6-digit numeric OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

// Function to format OTP with spaces between digits
const formatOTPWithSpaces = (otp) => {
    return otp.split('').join(' '); // Adds a space between each digit
};

// Function to send OTP email with HTML styling and spaced OTP
const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: 'otp.moonpay@gmail.com',
            pass: 'bbefvmhxcualzlzn'
        }
    });

    const formattedOTP = formatOTPWithSpaces(otp);

    const mailOptions = {
        from: 'otp.moonpay@gmail.com',
        to: email,
        subject: 'Your OTP for Verification - Moon Pay',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
                <h2 style="color: #4CAF50; font-size: 24px; font-weight: bold;">Moon Pay</h2>
                <p style="font-size: 18px;">Your OTP for Verification</p>
                <hr style="border: none; height: 1px; background-color: #eee;" />
                <p>Dear <span style="font-weight: bold;">${email}</span>,</p>
                <p>Thank you for initiating the verification process. Please find your One-Time Password (OTP) below:</p>
                <p style="font-size: 24px; font-weight: bold; color: #ffffff; background-color: #007BFF; padding: 10px; display: inline-block; border-radius: 5px; margin-top: 10px;">
                    OTP: ${formattedOTP}
                </p>
                <p style="margin-top: 20px;">This OTP is valid for 10 minutes. Please enter it in the required field to complete your verification.</p>
                <p>If you did not request this OTP, please disregard this email.</p>
                <br />
                <p>Thank you,</p>
                <p style="font-weight: bold;">Moon Pay</p>
                <p style="font-size: 14px; color: #777;">@help.moonpayx@gmail.com</p>
                <p style="font-size: 14px; color: #777;">moonpayx.com</p>
            </div>
        `
    };
    

    await transporter.sendMail(mailOptions);
};

module.exports = {
    generateOTP,
    sendOTPEmail
};
