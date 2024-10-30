const mongoose = require('mongoose');

const usaCardSchema = new mongoose.Schema({
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

const usaCard = mongoose.model("usaCard", usaCardSchema);
module.exports = usaCard;