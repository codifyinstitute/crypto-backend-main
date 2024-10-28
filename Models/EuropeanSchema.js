const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  swiftCode: {
    type: String,
    required: true,
  },
  bankName: { type: String, required: true },
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

const paymentMethodsSchemaEURO = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bankDetails: bankDetailsSchema,
  cardDetails: cardDetailsSchema
});

module.exports = mongoose.model('PaymentMethodsEuro', paymentMethodsSchemaEURO);
