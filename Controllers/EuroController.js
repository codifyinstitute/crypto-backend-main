
const mongoose = require('mongoose');
const moment = require('moment');
const Counter = require('../Models/counterSchema');
const PaymentMethodsEuro = require('../Models/EuropeanSchema');

// Add or Update Euro Payment Details
async function addOrUpdateEuroPaymentDetails(req, res) {
  const { userId, paymentType, bankDetails, cardDetails } = req.body;

  try {
    let updatedPaymentDetails = {};
    let responseData = {};
    let counter;

    if (paymentType === 'bankTransfer') {
      const {
        firstName,
        lastName,
        swiftCode,
        bankName,
        accountNumber,
        abaCode,
        Email,
        TransactionId,
        OrderId,
        USDTAmount,
        token,
        processingFee,
        networkFee,
        receivedAmount,
        status,
        date,
        time
      } = bankDetails;

      // Validate bank details
      if (!firstName || !lastName || !swiftCode || !bankName || !accountNumber ||
          !abaCode || !Email || !TransactionId || !OrderId || !USDTAmount ||
          !token || processingFee === undefined || networkFee === undefined ||
          receivedAmount === undefined || !status || !date || !time) {
        return res.status(400).json({ message: 'Missing required bank details fields.' });
      }

      // Update transaction counter
      counter = await Counter.findOne({ Title: 'Transaction' });
      if (!counter) {
        counter = new Counter({ Title: 'Transaction', Count: 1 });
      } else {
        counter.Count += 1;
        await counter.save();
      }
      const id = `EURO${counter.Count}`;

      updatedPaymentDetails.bankDetails = {
        id,
        firstName,
        lastName,
        swiftCode,
        bankName,
        accountNumber,
        abaCode,
        Email,
        TransactionId,
        OrderId,
        USDTAmount,
        token,
        processingFee,
        networkFee,
        receivedAmount,
        status,
        date,
        time
      };

      responseData = { bankDetails: updatedPaymentDetails.bankDetails };

    } else if (paymentType === 'cardPayment') {
      const {
        cardFirstName,
        cardLastName,
        cardNumber,
        expiryDate,
        cvv,
        phoneNumber,
        cardEmail,
        cardTransactionId,
        cardOrderId,
        cardUSDTAmount,
        cardToken,
        cardProcessingFee,
        cardNetworkFee,
        cardReceivedAmount,
        cardStatus,
        cardDate,
        cardTime
      } = cardDetails;

      // Validate card details
      if (!cardFirstName || !cardLastName || !cardNumber || !expiryDate ||
          !cvv || !phoneNumber || !cardEmail || !cardTransactionId || 
          !cardOrderId || !cardUSDTAmount || !cardToken ||
          cardProcessingFee === undefined || cardNetworkFee === undefined ||
          cardReceivedAmount === undefined || !cardStatus || !cardDate || !cardTime) {
        return res.status(400).json({ message: 'Missing required card details fields.' });
      }

      // Update transaction counter
      counter = await Counter.findOne({ Title: 'Transaction' });
      if (!counter) {
        counter = new Counter({ Title: 'Transaction', Count: 1 });
      } else {
        counter.Count += 1;
        await counter.save();
      }
      const id = `EURO${counter.Count}`;

      updatedPaymentDetails.cardDetails = {
        id,
        firstName: cardFirstName,
        lastName: cardLastName,
        cardNumber,
        expiryDate,
        cvv,
        phoneNumber,
        email: cardEmail,
        transactionId: cardTransactionId,
        orderId: cardOrderId,
        USDTAmount: cardUSDTAmount,
        token: cardToken,
        processingFee: cardProcessingFee,
        networkFee: cardNetworkFee,
        receivedAmount: cardReceivedAmount,
        status: cardStatus,
        date: cardDate,
        time: cardTime
      };

      responseData = { cardDetails: updatedPaymentDetails.cardDetails };

    } else {
      return res.status(400).json({ message: 'Invalid payment type.' });
    }

    // Save payment method
    const paymentMethod = await PaymentMethodsEuro.findOneAndUpdate(
      { userId },
      { $set: updatedPaymentDetails },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: 'Payment details saved successfully.', paymentDetails: responseData });

  } catch (error) {
    console.error('Error saving payment details:', error);
    return res.status(500).json({ message: 'Error saving payment details.', error });
  }
}

// Get Euro Payment Details by User ID or Email
async function getEuroPaymentDetails(req, res) {
  const { userId, email } = req.query;

  try {
    let paymentMethods;

    // Check for userId
    if (userId) {
      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }
      // Find payment methods by userId
      paymentMethods = await PaymentMethodsEuro.findOne({ userId: mongoose.Types.ObjectId(userId) });

    } else if (email) {
      // Find payment methods by email
      paymentMethods = await PaymentMethodsEuro.findOne({
        $or: [
          { "bankDetails.Email": email },
          { "cardDetails.email": email }
        ]
      });

    } else {
      return res.status(400).json({ message: 'Please provide either a userId or an email.' });
    }

    // Check if payment methods were found
    if (!paymentMethods) {
      return res.status(404).json({ message: 'Payment details not found.' });
    }

    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({ message: 'Error fetching payment details.', error });
  }
}

async function getAll(req, res) {
  try {
      const transactions = await PaymentMethodsEuro.find();

      res.status(200).json(transactions);
  } catch (error) {
      res.status(500).json({ message: "Error payment data transactions", error: error.message });
  }
};

module.exports = {
  addOrUpdateEuroPaymentDetails,
  getEuroPaymentDetails,
  getAll
};
