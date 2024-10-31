const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/transactionController'); 
const paymentControllerusa = require ('../Controllers/UnitedStateController');
const paymentControllerEuro = require ('../Controllers/EuroController');
const paymentControllerUK  = require ('../Controllers/UkController');
const brlPaymentController =  require('../Controllers/BrazilController');
const aedController = require('../Controllers/DubaiController');






//FOR USA User adding details
router.post('/us/addOrUpdate', paymentControllerusa.addOrUpdateUSAPaymentDetails);
router.get('/us/getPaymentDetails/:userId', paymentControllerusa.getUSAPaymentDetails);
router.get('/us/getPaymentDetailsByEmail', paymentControllerusa.getUSAPaymentDetails);
router.get('/us/all/', paymentControllerusa.getAll);


//FOR Euro User adding details
router.post('/euro/addOrUpdate', paymentControllerEuro.addOrUpdateEuroPaymentDetails);
router.get('/euro/getPaymentDetails/:userId', paymentControllerEuro.getEuroPaymentDetails);
router.get('/euro/getPaymentDetailsByEmail', paymentControllerEuro.getEuroPaymentDetails);
router.get('/euro/all/', paymentControllerEuro.getAll);



// FOR UK User 
router.post('/uk/addOrUpdate', paymentControllerUK.addOrUpdateUKBankDetails);
router.get('/uk/getPaymentDetails/:userId', paymentControllerUK.getUKBankDetails);
// router.get('/uk/getPaymentDetails/:userId', paymentControllerUK.getUKBankDetails);
router.get('/uk/getPaymentDetailsByEmail/', paymentControllerUK.getUKBankDetails);
router.get('/uk/all/', paymentControllerUK.getAll);



// FOR Brazil User 
router.post('/brl/addOrUpdate',  brlPaymentController.addOrUpdateBRLPaymentDetails);
router.get('/brl/getPaymentDetails/:userId', brlPaymentController.getBRLPaymentDetails);
router.get('/brl/all/', brlPaymentController.getAll);
router.get('/brl/getByEmail', brlPaymentController.getBRLPaymentDetailsByEmail);


 

router.post('/aed/addOrUpdate', aedController.addOrUpdateAEDPaymentDetails);
router.get('/aed/getPaymentDetails/:userId', aedController.getAEDPaymentDetails);
router.get('/aed/all/', aedController.getAll);
router.get('/aed/getByEmail', aedController.getAEDPaymentDetailsByEmail);


// Route to add a new transaction
router.post('/add', transactionController.addTransaction);


// Route to get all transactions
router.get('/all', transactionController.getAllTransactions);

// Route to get a Count by ID
router.get('/get/count', transactionController.getCountById);

// Route to get a transaction by ID
router.get('/get/:id', transactionController.getTransactionById);

// Route to get a transaction by ID
router.get('/get/email/:Email', transactionController.getTransactionByEmail);

// Route to update a transaction by ID
router.put('/put/:id', transactionController.updateTransaction);
router.put('/complete/:id', transactionController.completed);
router.put('/reject/:id', transactionController.Reject);

// Route to delete a transaction by ID
router.delete('/del/:id', transactionController.deleteTransaction);

module.exports = router;
