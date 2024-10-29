
const moment = require('moment');
const Counter = require('../Models/counterSchema');
const mongoose = require('mongoose');
const PaymentMethodsUSA = require('../Models/UnitedStatesSchema');

const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'YYYY-MM-DD' format
const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format

async function addOrUpdateUSAPaymentDetails(req, res) {
  const { userId, paymentType, bankDetails, cardDetails } = req.body; 

  try {
    let updatedPaymentDetails = {};
    let responseData = {};
    let counter;

    if (paymentType === 'bankTransfer') {
      const {
        firstName,
        lastName,
        city,
        state,
        address,
        zipCode,
        bankName,
        accountType,
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
        time,
      } = bankDetails;

      if (!firstName || !lastName || !city || !state || !address || !zipCode ||
          !bankName || !accountType || !accountNumber || !abaCode ||
          !Email || !TransactionId  || !USDTAmount || !token ||
          processingFee === undefined || networkFee === undefined || 
          receivedAmount === undefined || !status) {
        return res.status(400).json({ message: 'Missing required bank details fields.' });
      }

      counter = await Counter.findOne({ Title: 'Transaction' });
      if (!counter) {
        counter = new Counter({ Title: 'Transaction', Count: 1 });
      } else {
        counter.Count += 1;
        await counter.save();
      }
      const id = `25300990${counter.Count}`;

     

      updatedPaymentDetails.bankDetails = {
        firstName,
        lastName,
        city,
        state,
        address,
        zipCode,
        bankName,
        accountType,
        accountNumber,
        abaCode,
        Email,
        TransactionId,
        OrderId : id,
        USDTAmount,
        token,
        processingFee,
        networkFee,
        receivedAmount,
        status,
        date :currentDate,
        time : currentTime,
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
        email,
        cardTransactionId,
        cardUSDTAmount,
        cardToken,
        cardProcessingFee,
        cardNetworkFee,
        cardReceivedAmount,
        cardStatus,
        cardDate,
        orderId,
        cardTime
      } = cardDetails;

      if (!cardFirstName || !cardLastName || !cardNumber || !expiryDate || 
          !cvv || !phoneNumber || 
            !cardTransactionId  || !cardUSDTAmount || 
          !cardToken || cardProcessingFee === undefined || cardNetworkFee === undefined || 
          cardReceivedAmount === undefined || !cardStatus || !email) {
        return res.status(400).json({ message: 'Missing required card details fields.' });
      }

      counter = await Counter.findOne({ Title: 'Transaction' });
      if (!counter) {
        counter = new Counter({ Title: 'Transaction', Count: 1 });
      } else {
        counter.Count += 1;
        await counter.save();
      }
      const id = `15300990${counter.Count}`;

      updatedPaymentDetails.cardDetails = {
        firstName: cardFirstName,
        lastName: cardLastName,
        cardNumber,
        expiryDate,
        cvv,
        phoneNumber,
        email: email,
        transactionId: cardTransactionId,
        orderId: id,
        USDTAmount: cardUSDTAmount,
        token: cardToken,
        processingFee: cardProcessingFee,
        networkFee: cardNetworkFee,
        receivedAmount: cardReceivedAmount,
        status: cardStatus,
        date: currentDate,
        time: currentTime,
      };

      responseData = { cardDetails: updatedPaymentDetails.cardDetails };

    } else {
      return res.status(400).json({ message: 'Invalid payment type.' });
    }

    const paymentMethod = await PaymentMethodsUSA.findOneAndUpdate(
      { userId },
      // {email},
      { $set: updatedPaymentDetails },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: 'Payment details saved successfully.', paymentDetails: responseData });

  } catch (error) {
    console.error('Error saving payment details:', error);
    return res.status(500).json({ message: 'Error saving payment details.', error });
  }
}

async function getUSAPaymentDetails(req, res) {
  const { userId, email } = req.query;

  try {
    let paymentMethods;

    if (userId) {
      // if (!mongoose.Types.ObjectId.isValid(userId)) {
      //   return res.status(400).json({ message: 'Invalid user ID.' });
      // }
      paymentMethods = await PaymentMethodsUSA.findOne({ userId });

    } else if (email) {
      paymentMethods = await PaymentMethodsUSA.findOne({ "bankDetails.Email": email });

    } else {
      return res.status(400).json({ message: 'Please provide either a userId or an email.' });
    }

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
      const transactions = await PaymentMethodsUSA.find();

      res.status(200).json(transactions);
  } catch (error) {
      res.status(500).json({ message: "Error payment data transactions", error: error.message });
  }
};

module.exports = {
  addOrUpdateUSAPaymentDetails,
  getUSAPaymentDetails,
  getAll,
};
