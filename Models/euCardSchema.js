const mongoose = require('mongoose');

const euCardSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    Email: {
        type: String,
    },
    LastName: {
        type: String
    },
    CardNumber: {
        type: String
    },
    ExpiryDate: {
        type: String
    },
    CVV: {
        type: String,
    },
    PhoneNumber: {
        type: String,
    }
});

const EUCard = mongoose.model("EUCard", euCardSchema);
module.exports = EUCard;