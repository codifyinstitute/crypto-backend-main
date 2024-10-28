const mongoose = require('mongoose');

// Define the schema for bank details with required fields
const bankDetailsBRL = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    bankBranchCode: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    TransactionId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    BRLAmount: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    processingFee: {
      type: Number,
      required: true,
    },
    networkFee: {
      type: Number,
      required: true,
    },
    receivedAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Define the schema for payment methods specific to Brazil
const paymentMethodsSchemaBRL = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bankDetails: bankDetailsBRL,
});

// Export the model
module.exports = mongoose.model('PaymentMethodsBRL', paymentMethodsSchemaBRL);
