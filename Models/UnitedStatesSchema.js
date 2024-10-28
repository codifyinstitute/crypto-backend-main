// const mongoose = require('mongoose');

// const bankDetailsSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   address: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   bankName: { type: String, required: true },
// //   accountType: { type: String, enum: ['Checking', 'Savings'], required: true },
//   accountType: { type: String, required: true },

//   accountNumber: { type: String, required: true },
//   abaCode: { type: String, required: true },
// //   currency: { type: String, enum: ['USD'], required: true },
// //   country: { type: String, enum: ['United States'], required: true }
// //   country: { type: String, required: true }

// }, { _id: false });

// const cardDetailsSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   cardNumber: { type: String, required: true },
//   expiryDate: { type: String, required: true },
//   cvv: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   // cityCode : {type :String,required : true },
// //   currency: { type: String, enum: ['USD'], required: true },
// //   country: { type: String, enum: ['United States'], required: true }
// }, { _id: false });

// const paymentMethodsSchemaUSA = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bankDetails: bankDetailsSchema,
//   cardDetails: cardDetailsSchema
// });

// module.exports = mongoose.model('PaymentMethodsUSA', paymentMethodsSchemaUSA);


const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  bankName: { type: String, required: true },
  accountType: { type: String, required: true },
  accountNumber: { type: String, required: true },
  abaCode: { type: String, required: true },
  Email: { type: String, required: true }, 
  TransactionId: { type: String, required: true }, 
  OrderId: { type: String, required: true },  
  USDTAmount: { type: Number, required: true }, 
  token: { type: String, required: true },  
  processingFee: { type: Number, required: true },  
  networkFee: { type: Number, required: true },  
  receivedAmount: { type: Number, required: true }, 
  status: { type: String, required: true },  
  date: { type: String, required: true },  
  time: { type: String, required: true },  
}, { _id: false });

const cardDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  Email: { type: String, required: true },  
  transactionId: { type: String, required: true },  
  OrderId: { type: String, required: true },  
  USDTAmount: { type: Number, required: true },  
  token: { type: String, required: true },  
  processingFee: { type: Number, required: true },
  networkFee: { type: Number, required: true },  
  receivedAmount: { type: Number, required: true },  
  status: { type: String, required: true },
  date: { type: String, required: true },  
  time: { type: String, required: true },  
}, { _id: false });

const paymentMethodsSchemaUSA = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bankDetails: bankDetailsSchema,
  cardDetails: cardDetailsSchema
});

module.exports = mongoose.model("PaymentMethodsUSA", paymentMethodsSchemaUSA);
