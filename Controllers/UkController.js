



const moment = require('moment');
const Counter = require('../Models/counterSchema');
const mongoose = require('mongoose');
const PaymentMethodsUK = require('../Models/UnitedKingdomSchema');
const Transaction = require('../Models/transactionSchema');

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

// Add or update UK bank details for a user
async function addOrUpdateUKBankDetails(req, res) {
  const { userId, bankDetails } = req.body;

  try {
    const {
      firstName,
      lastName,
      TransactionId,
      Email,
      address,
      bankName,
      accountNumber,
      sortCode,
      UKAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
    } = bankDetails;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !TransactionId ||
      !Email ||
      !address ||
      !bankName ||
      !accountNumber ||
      !sortCode ||
      UKAmount === undefined ||
      token === undefined ||
      processingFee === undefined ||
      networkFee === undefined ||
      receivedAmount === undefined
    ) {
      return res.status(400).json({ message: 'Missing required bank details fields.' });
    }

    // Generate or update counter for order ID
    let counter = await Counter.findOne({ Title: 'Transaction' });
    if (!counter) {
      counter = new Counter({ Title: 'Transaction', Count: 1 });
    } else {
      counter.Count += 1;
    }
    await counter.save(); // Save the updated counter

    const orderId = `45300990${counter.Count}`;
    const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'DD-MM-YYYY' format
    const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format

    const updatedBankDetails = {
      firstName,
      lastName,
      OrderId: orderId,
      TransactionId,
      Email,
      address,
      bankName,
      accountNumber,
      sortCode,
      UKAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
      status: 'Pending', // Setting default status as 'Pending'
      date: currentDate,
      time: currentTime
    };

    // Find the payment method by userId and update, or create a new one if not found
    const paymentMethod = await PaymentMethodsUK.findOneAndUpdate(
      { userId },
      { $set: { bankDetails: updatedBankDetails } },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: 'Bank details saved successfully.', paymentMethod });

  } catch (error) {
    console.error('Error saving bank details:', error);
    return res.status(500).json({ message: 'Error saving bank details.', error });
  }
}

// Get UK bank details for a user by userId or Email
async function getUKBankDetails(req, res) {
  const { userId } = req.params;
  const { Email } = req.query;

  try {
    let paymentMethods;

    if (userId) {
      // Validate the userId if it's provided
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }
      // Find payment methods by userId
      paymentMethods = await PaymentMethodsUK.findOne({ userId });
    } else if (Email) {
      // Find payment methods by Email
      paymentMethods = await PaymentMethodsUK.findOne({ 'bankDetails.Email': Email });
    } else {
      return res.status(400).json({ message: 'Please provide either a userId or Email.' });
    }

    // If no payment methods found, return a 404 response
    if (!paymentMethods) {
      return res.status(404).json({ message: 'Bank details not found.' });
    }

    // Return the found payment methods
    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return res.status(500).json({ message: 'Error fetching bank details.', error });
  }
}

// Get all UK bank details
async function getAll(req, res) {
  try {
    const transactions = await PaymentMethodsUK.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment data transactions', error: error.message });
  }
}

module.exports = {
  addOrUpdateUKBankDetails,
  getUKBankDetails,
  getAll
};
