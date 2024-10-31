const mongoose = require("mongoose");

const withdrawModel = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Currency: {
        type: String,
        required: true,
    },
    Network:{
        type: String,
        required: true
    },
    WalletAddress:{
        type: String,
        required: true
    },
    WithdrawAmount:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true
    },
    Date:{
        type: String
    },
    Time:{
        type: String
    }
});

const Withdraw = mongoose.model("Withdraw", withdrawModel);
module.exports = Withdraw;