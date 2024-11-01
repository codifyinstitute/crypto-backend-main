const express = require('express');
const router = express.Router();
const indiaController = require('../Controllers/indiaController');
const brazilBankController = require('../Controllers/brazilBankController');
const ukController = require('../Controllers/ukBankController'); 
const euBankController = require('../Controllers/euBankController'); 
const euCardController = require('../Controllers/euCardController'); 
const uaeController = require('../Controllers/uaeController'); 
const usaBankController = require('../Controllers/usabankController'); 
const usaCardController = require('../Controllers/usaCardController'); 




// Get all records
router.get('/india/all', indiaController.getAllRecords);
router.get('/bank/all/:email', indiaController.getAllCountryBank);

// Get record by email
router.get('/india/:email', indiaController.getRecordByEmail);

// Create a new record
router.post('/india/add', indiaController.createRecord);

// Update a record
router.put('/india/:id', indiaController.updateRecord);

// Delete a record
router.delete('/india/:id', indiaController.deleteRecord);



// Get all records
router.get('/brl/all', brazilBankController.getAllRecords);

// Get record by email
router.get('/brl/:email', brazilBankController.getRecordByEmail);

// Create a new record
router.post('/brl/add', brazilBankController.createRecord);

// Update a record
router.put('/brl/:id', brazilBankController.updateRecord);

// Delete a record
router.delete('/brl/:id', brazilBankController.deleteRecord);



// Get all records
router.get('/uk/all', ukController.getAllRecords);

// Get record by email
router.get('/uk/:email', ukController.getRecordByEmail);

// Create a new record
router.post('/uk/add', ukController.createRecord);

// Update a record
router.put('/uk/:id', ukController.updateRecord);

// Delete a record
router.delete('/uk/:id', ukController.deleteRecord);



// Get all records
router.get('/euro/all', euBankController.getAllRecords);

// Get record by email
router.get('/euro/:email', euBankController.getRecordByEmail);

// Create a new record
router.post('/euro/add', euBankController.createRecord);

// Update a record
router.put('/euro/:id', euBankController.updateRecord);

// Delete a record
router.delete('/euro/:id', euBankController.deleteRecord);




// Get all records
router.get('/euro/card/all', euCardController.getAllRecords);

// Get record by email
router.get('/euro/card/:email', euCardController.getRecordByEmail);

// Create a new record
router.post('/euro/card/add', euCardController.createRecord);

// Update a record
router.put('/euro/card/:id', euCardController.updateRecord);

// Delete a record
router.delete('/euro/card/:id', euCardController.deleteRecord);


// Get all records
router.get('/aed/all', uaeController.getAllRecords);

// Get record by email
router.get('/aed/:email', uaeController.getRecordByEmail);

// Create a new record
router.post('/aed/add', uaeController.createRecord);

// Update a record
router.put('/aed/:id', uaeController.updateRecord);

// Delete a record
router.delete('/aed/:id', uaeController.deleteRecord);



// Get all records
router.get('/usa/all', usaBankController.getAllRecords);

// Get record by email
router.get('/usa/:email', usaBankController.getRecordByEmail);

// Create a new record
router.post('/usa/add', usaBankController.createRecord);

// Update a record
router.put('/usa/:id', usaBankController.updateRecord);

// Delete a record
router.delete('/usa/:id', usaBankController.deleteRecord);



// Get all records
router.get('/usa/card/all', usaCardController.getAllRecords);

// Get record by email
router.get('/usa/card/:email', usaCardController.getRecordByEmail);

// Create a new record
router.post('/usa/card/add', usaCardController.createRecord);

// Update a record
router.put('/usa/card/:id', usaCardController.updateRecord);

// Delete a record
router.delete('/usa/card/:id', usaCardController.deleteRecord);


module.exports = router;
