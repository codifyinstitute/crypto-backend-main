const mongoose = require("mongoose");

const euroStaticSchema = new mongoose.Schema({
    TransactionFee: {
        type: Number,
        required: true
    },
    NetworkFee:{
        type:Number,
        required:true
    },
    LoginId: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    MinAmount:{
        type:Number,
        required:true
    },
    Wazirx:{
        Average:{
            type:Number,
        }
    },
    Binance:{
        Average:{
            type:Number,
        }
    },
    Coinbase:{
        Average:{
            type:Number,
        }
    },
    Kraken:{
        Average:{
            type:Number,
        }
    }
});

const Static = mongoose.model("euroStaticSchema", euroStaticSchema);
module.exports = Static;