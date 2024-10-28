const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    MobileNo:{
        type: String,
        required: true,
    },
    Profile:{
        type: String,
        required: true,
        default:"Icon.jpg"
    },
    OTP: {
        type: String,
        required: false,
    },
    OTPExpires: {
        type: Date,
        required: false,
    },
    Accounts: [{
        Name: {
            type: String,
            required: true
        },
        Country: {
            type: String,
            required: true
        },
        BankName: {
            type: String,
            required: true
        },
        AccountNumber: {
            type: String,
            required: true
        },
        IFSC: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('User', userSchema);
