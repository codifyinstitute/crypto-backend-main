const mongoose = require('mongoose');

const uaeSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    Email: {
        type: String,
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
    OpeningBranch: {
        type: String,
    },
    IBAN: {
        type: String,
    }
});

const uae = mongoose.model("uae", uaeSchema);
module.exports = uae;