const mongoose = require('mongoose');

const usaCardSchema = new mongoose.Schema({
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
    City: {
        type: String,
    },
    State: {
        type: String,
    },
    Address: {
        type: String,
    },
    ZipCode: {
        type: String,
    },
    AccountType: {
        type: String,
    },
    ABACode: {
        type: String,
    }
});

const usaCard = mongoose.model("usaCard", usaCardSchema);
module.exports = usaCard;