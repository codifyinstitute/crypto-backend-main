

// const moment = require('moment');
// const Counter = require('../Models/counterSchema');
// const mongoose = require('mongoose');
// const PaymentMethodsAED = require('../Models/AEDSchema');

// async function generateOrderId() {
//   return Math.floor(1000000000 + Math.random() * 9000000000).toString();
// }

// // Add or update AED bank details for a user
// async function addOrUpdateAEDPaymentDetails(req, res) {
//   const { userId, bankDetails } = req.body;

//   try {
//     const {
//       firstName,
//       lastName,
//       address,
//       bankName,
//       accountNumber,
//       accountType,
//       bankBranchCode,
//       Email,
//       TransactionId,
//       AEDAmount,
//       token,
//       processingFee,
//       networkFee,
//       receivedAmount,
//       status,
//       date,
//       time,
//     } = bankDetails;

//     let counter = await Counter.findOne({ Title: `Transaction` });

//     if (!counter) {
//         counter = new Counter({ Title: `Transaction`, Count: 1 });
//     } else {
//         counter.Count += 1;
//     }

//     const id = `AED${counter.Count}`;
//     const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'DD-MM-YYYY' format
//     const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format

//     // Validate required fields
//     if (
//       !firstName ||
//       !lastName ||
//       !address ||
//       !bankName ||
//       !TransactionId ||
//       !Email ||
//       !token ||
//       !processingFee ||
//       !networkFee ||
//       !receivedAmount ||
//       !status ||
//       !date ||
//       !time ||
//       !accountNumber ||
//       !accountType ||
//       !bankBranchCode ||
//       AEDAmount === undefined
//     ) {
//       return res.status(400).json({ message: 'Missing required bank details fields.' });
//     }

//     const updatedBankDetails = {
//       firstName,
//       lastName,
//       orderId: id,
//       TransactionId,
//       Email,
//       address,
//       bankName,
//       accountNumber,
//       accountType,
//       bankBranchCode,
//       AEDAmount,
//       token,
//       processingFee,
//       networkFee,
//       receivedAmount,
//       status,
//       date,
//       time,
//     };

//     // Find the payment method by userId and update, or create a new one if not found
//     const paymentMethod = await PaymentMethodsAED.findOneAndUpdate(
//       { userId },
//       { $set: { bankDetails: updatedBankDetails } },
//       { upsert: true, new: true }
//     );

//     return res.status(200).json({ message: 'Bank details saved successfully.', paymentMethod });

//   } catch (error) {
//     console.error('Error saving bank details:', error);
//     return res.status(500).json({ message: 'Error saving bank details.', error });
//   }
// }

// // Get AED bank details for a user
// async function getAEDPaymentDetails(req, res) {
//   const { userId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: 'Invalid user ID.' });
//   }

//   try {
//     const paymentMethods = await PaymentMethodsAED.findOne({ userId });

//     if (!paymentMethods) {
//       return res.status(404).json({ message: 'Bank details not found.' });
//     }

//     return res.status(200).json(paymentMethods);
//   } catch (error) {
//     console.error('Error fetching bank details:', error);
//     return res.status(500).json({ message: 'Error fetching bank details.', error });
//   }
// }

// async function getAll(req, res) {
//   try {
//       const transactions = await PaymentMethodsAED.find();

//       res.status(200).json(transactions);
//   } catch (error) {
//       res.status(500).json({ message: "Error payment data transactions", error: error.message });
//   }
// };


// module.exports = {
//   addOrUpdateAEDPaymentDetails,
//   getAEDPaymentDetails,
//   getAll,
// };


const moment = require('moment');
const Counter = require('../Models/counterSchema');
const mongoose = require('mongoose');
const PaymentMethodsAED = require('../Models/AEDSchema');

// Utility function to generate a unique order ID
async function generateOrderId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Add or update AED bank details for a user
async function addOrUpdateAEDPaymentDetails(req, res) {
  const { userId, bankDetails } = req.body;

  try {
    const {
      firstName,
      lastName,
      address,
      bankName,
      accountNumber,
      accountType,
      bankBranchCode,
      Email,
      TransactionId,
      AEDAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
      status,
      date,
      time,
    } = bankDetails;

    let counter = await Counter.findOne({ Title: `Transaction` });

    if (!counter) {
        counter = new Counter({ Title: `Transaction`, Count: 1 });
    } else {
        counter.Count += 1;
    }

    const id = `16300990${counter.Count}`;
    const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'DD-MM-YYYY' format
    const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !address ||
      !bankName ||
      !TransactionId ||
      !Email ||
      !token ||
      !processingFee ||
      !networkFee ||
      !receivedAmount ||
      !status ||
      !date ||
      !time ||
      !accountNumber ||
      !accountType ||
      !bankBranchCode ||
      AEDAmount === undefined
    ) {
      return res.status(400).json({ message: 'Missing required bank details fields.' });
    }

    const updatedBankDetails = {
      firstName,
      lastName,
      orderId: id,
      TransactionId,
      Email,
      address,
      bankName,
      accountNumber,
      accountType,
      bankBranchCode,
      AEDAmount,
      token,
      processingFee,
      networkFee,
      receivedAmount,
      status,
      date,
      time,
    };

    // Find the payment method by userId and update, or create a new one if not found
    const paymentMethod = await PaymentMethodsAED.findOneAndUpdate(
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

// Get AED bank details for a user by userId
async function getAEDPaymentDetails(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const paymentMethods = await PaymentMethodsAED.findOne({ userId });

    if (!paymentMethods) {
      return res.status(404).json({ message: 'Bank details not found.' });
    }

    return res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return res.status(500).json({ message: 'Error fetching bank details.', error });
  }
}

// Get AED bank details by email
async function getAEDPaymentDetailsByEmail(req, res) {
  const { Email } = req.query;

  if (!Email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const paymentMethod = await PaymentMethodsAED.findOne({ 'bankDetails.Email': Email });

    if (!paymentMethod) {
      return res.status(404).json({ message: 'Bank details not found for this email.' });
    }

    return res.status(200).json(paymentMethod);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    return res.status(500).json({ message: 'Error fetching bank details.', error });
  }
}

// Get all AED payment details
async function getAll(req, res) {
  try {
    const transactions = await PaymentMethodsAED.find();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment data.', error: error.message });
  }
}

module.exports = {
  addOrUpdateAEDPaymentDetails,
  getAEDPaymentDetails,
  getAll,
  getAEDPaymentDetailsByEmail,
};
