const mongoose = require("mongoose");

const brlStaticSchema = new mongoose.Schema({
    TransactionFee: {
        type: Number,
        required: true
    },
    NetworkFee:{
        type:Number,
        required:true
    },
    LoginId: {
        type: String
    },
    Password: {
        type: String
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

const Static = mongoose.model("brlStaticSchema", brlStaticSchema);
module.exports = Static;