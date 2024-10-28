const mongoose = require("mongoose");

const EuroCurrency = new mongoose.Schema({
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

const Currency = mongoose.model("EuroCurrency", EuroCurrency);
module.exports = Currency;