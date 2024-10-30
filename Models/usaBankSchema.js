const mongoose = require('mongoose');

const usaBankSchema = new mongoose.Schema({
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

const usaBank = mongoose.model("usaBank", usaBankSchema);
module.exports = usaBank;