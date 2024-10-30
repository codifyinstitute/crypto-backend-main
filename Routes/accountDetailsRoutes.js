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

// Get record by email
router.get('/india/:email', indiaController.getRecordByEmail);

// Create a new record
router.post('/india/add', indiaController.createRecord);

// Update a record
router.put('/india/:id', indiaController.updateRecord);

// Delete a record
router.delete('/india/:id', indiaController.deleteRecord);



// Get all records
router.get('/brazil-bank/all', brazilBankController.getAllRecords);

// Get record by email
router.get('/brazil-bank/:email', brazilBankController.getRecordByEmail);

// Create a new record
router.post('/brazil-bank/add', brazilBankController.createRecord);

// Update a record
router.put('/brazil-bank/:id', brazilBankController.updateRecord);

// Delete a record
router.delete('/brazil-bank/:id', brazilBankController.deleteRecord);



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
router.get('/eu-bank/all', euBankController.getAllRecords);

// Get record by email
router.get('/eu-bank/:email', euBankController.getRecordByEmail);

// Create a new record
router.post('/eu-bank/add', euBankController.createRecord);

// Update a record
router.put('/eu-bank/:id', euBankController.updateRecord);

// Delete a record
router.delete('/eu-bank/:id', euBankController.deleteRecord);




// Get all records
router.get('/eu-card/all', euCardController.getAllRecords);

// Get record by email
router.get('/eu-card/:email', euCardController.getRecordByEmail);

// Create a new record
router.post('/eu-card/add', euCardController.createRecord);

// Update a record
router.put('/eu-card/:id', euCardController.updateRecord);

// Delete a record
router.delete('/eu-card/:id', euCardController.deleteRecord);


// Get all records
router.get('/uae/all', uaeController.getAllRecords);

// Get record by email
router.get('/uae/:email', uaeController.getRecordByEmail);

// Create a new record
router.post('/uae/add', uaeController.createRecord);

// Update a record
router.put('/uae/:id', uaeController.updateRecord);

// Delete a record
router.delete('/uae/:id', uaeController.deleteRecord);



// Get all records
router.get('/usa-bank/all', usaBankController.getAllRecords);

// Get record by email
router.get('/usa-bank/:email', usaBankController.getRecordByEmail);

// Create a new record
router.post('/usa-bank/add', usaBankController.createRecord);

// Update a record
router.put('/usa-bank/:id', usaBankController.updateRecord);

// Delete a record
router.delete('/usa-bank/:id', usaBankController.deleteRecord);



// Get all records
router.get('/usa-card/all', usaCardController.getAllRecords);

// Get record by email
router.get('/usa-card/:email', usaCardController.getRecordByEmail);

// Create a new record
router.post('/usa-card/add', usaCardController.createRecord);

// Update a record
router.put('/usa-card/:id', usaCardController.updateRecord);

// Delete a record
router.delete('/usa-card/:id', usaCardController.deleteRecord);


module.exports = router;
