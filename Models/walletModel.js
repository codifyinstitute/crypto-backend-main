const mongoose = require("mongoose");

const walletModel = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Amount: {
        type: Number
    },
    PendingAmount: {
        type: Number
    }
});

const Wallet = mongoose.model("Wallet", walletModel);
module.exports = Wallet;