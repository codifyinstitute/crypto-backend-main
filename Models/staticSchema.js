const mongoose = require("mongoose");

const staticSchema = new mongoose.Schema({
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
        },
        Min:{
            type:Number,
        },
        Max:{
            type:Number,
        }
    },
    Binance:{
        Average:{
            type:Number,
        },
        Min:{
            type:Number,
        },
        Max:{
            type:Number,
        }
    },
    Coinbase:{
        Average:{
            type:Number,
        },
        Min:{
            type:Number,
        },
        Max:{
            type:Number,
        }
    },
    Kraken:{
        Average:{
            type:Number,
        },
        Min:{
            type:Number,
        },
        Max:{
            type:Number,
        }
    }
});

const Static = mongoose.model("Static", staticSchema);
module.exports = Static;