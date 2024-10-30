const mongoose = require('mongoose');

const brazilBankSchema = new mongoose.Schema({
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
    AccountType: {
        type: String
    },
    IDType: {
        type: String
    },
    IDNumber: {
        type: String
    },
    BranchCode: {
        type: String,
    }
});

const BrazilBank = mongoose.model("BrazilBank", brazilBankSchema);
module.exports = BrazilBank;