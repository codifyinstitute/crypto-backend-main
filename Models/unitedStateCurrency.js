const mongoose = require("mongoose");

const UnitedStateCurrency = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Symbol: {
        type: String,
        required: true,
        unique: true
    },
    Rate:{
        type: Number,
        required: true
    },
    TransactionId:{
        type: String,
        required: true
    },
    QRCode:{
        type: String,
        required: true
    }
});

const Currency = mongoose.model("USCurrency", UnitedStateCurrency);
module.exports = Currency;