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
        type: Number,
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
    }
});

const Withdraw = mongoose.model("Withdraw", withdrawModel);
module.exports = Withdraw;