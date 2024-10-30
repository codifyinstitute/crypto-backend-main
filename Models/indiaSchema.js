const mongoose = require('mongoose');

const indiaSchema = new mongoose.Schema({
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
    IFSC: {
        type: String,
    }
});

const India = mongoose.model("India", indiaSchema);
module.exports = India;