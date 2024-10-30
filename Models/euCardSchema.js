const mongoose = require('mongoose');

const euCardSchema = new mongoose.Schema({
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
    CardNo: {
        type: String
    },
    ExpiryDate: {
        type: String
    },
    CVVNo: {
        type: String,
    },
    PhoneNo: {
        type: String,
    }
});

const EUCard = mongoose.model("EUCard", euCardSchema);
module.exports = EUCard;