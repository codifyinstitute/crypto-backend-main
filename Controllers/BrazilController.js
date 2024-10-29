

const moment = require('moment');
const Counter = require('../Models/counterSchema');
const mongoose = require('mongoose');
const PaymentMethodsBRL = require('../Models/BrazilSchema');
const Transaction = require('../Models/transactionSchema'); // Added Transaction model import

// Utility function to generate a 10-digit unique OrderId
async function generateUniqueOrderId() {
  let isUnique = false;
  let orderId;

  while (!isUnique) {
    orderId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const existingTransaction = await Transaction.findOne({ OrderId: orderId });
    if (!existingTransaction) {
      isUnique = true;
    }
  }

  return orderId;
}

// Add or update BRL bank details for a user
async function addOrUpdateBRLPaymentDetails(req, res) {
  const { userId, bankDetails } = req.body;

  try {
    const {
      firstName,
      lastName,
      address,
      bankName,
      accountType,
      accountNumber,
      bankBranchCode,
      Email,
      OrderId,
      TransactionId,
      BRLAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
      status,
    } = bankDetails;

    let counter = await Counter.findOne({ Title: 'Transaction' });

    if (!counter) {
      counter = new Counter({ Title: 'Transaction', Count: 1 });
    } else {
      counter.Count += 1;
    }

    const orderId = `205300990${counter.Count}`;
    const currentDate = moment().format('DD-MM-YYYY');
    const currentTime = moment().format('HH:mm:ss');

    if (
      !firstName ||
      !lastName ||
      !address ||
      !bankName ||
      !accountType ||
      !accountNumber ||
      !bankBranchCode ||
      !Email ||
      !TransactionId ||
      BRLAmount === undefined ||
      !token ||
      processingFee === undefined ||
      networkFee === undefined ||
      receivedAmount === undefined ||
      !status
    ) {
      return res.status(400).json({ message: 'Missing required bank details fields.' });
    }

    const updatedBankDetails = {
      firstName,
      lastName,
      orderId: orderId,
      TransactionId,
      Email,
      address,
      bankName,
      accountType,
      accountNumber,
      bankBranchCode,
      BRLAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
      status: 'Pending',
      date: currentDate,
      time: currentTime,
    };

    const paymentMethod = await PaymentMethodsBRL.findOneAndUpdate(
      { userId },
      { $set: { bankDetails: updatedBankDetails } },
      { upsert: true, new: true }
    );

    await counter.save();

    return res.status(200).json({ message: 'Bank details saved successfully.', paymentMethod });

  } catch (error) {
    console.error('Error saving bank details:', error);
    return res.status(500).json({ message: 'Error saving bank details.', error });
  }
}

// Get BRL bank details for a user by userId
async function getBRLPaymentDetails(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const paymentMethods = await PaymentMethodsBRL.findOne({ userId });

    if (!paymentMethods) {
      return res.status(404).json({ message: 'Bank details not found.' });
    }

    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return res.status(500).json({ message: 'Error fetching bank details.', error });
  }
}

// Get BRL bank details for a user by Email
async function getBRLPaymentDetailsByEmail(req, res) {
  const { Email } = req.query;

  if (!Email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const paymentMethods = await PaymentMethodsBRL.findOne({ 'bankDetails.Email': Email });

    if (!paymentMethods) {
      return res.status(404).json({ message: 'Bank details not found.' });
    }

    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return res.status(500).json({ message: 'Error fetching bank details.', error });
  }
}

// Get all BRL bank details
async function getAll(req, res) {
  try {
    const transactions = await PaymentMethodsBRL.find();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment data transactions', error: error.message });
  }
}

module.exports = {
  addOrUpdateBRLPaymentDetails,
  getBRLPaymentDetails,
  getBRLPaymentDetailsByEmail,
  getAll,
};

