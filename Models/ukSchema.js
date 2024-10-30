const mongoose = require('mongoose');

const ukSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    Email: {
        type: String
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
    Address: {
        type: String,
    },
    SortCode: {
        type: String,
    }
});

const UK = mongoose.model("UK", ukSchema);
module.exports = UK;