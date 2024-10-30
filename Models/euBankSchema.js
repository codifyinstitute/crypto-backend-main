const mongoose = require('mongoose');

const euBankSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    LastName: {
        type: String
    },
    BankName: {
        type: String
    },
    AccountNo: {
        type: String
    },
    ABACode: {
        type: String,
    },
    SwiftCode: {
        type: String,
    }
});

const EUBank = mongoose.model("EUBank", euBankSchema);
module.exports = EUBank;