const express = require('express');
const router = express.Router();
const transController = require('../controllers/transController');

router.post('/newTrans', transController.newTrans);
router.get('/all', transController.getAllTransactions);
router.get('/:id', transController.getTransactionById);
router.put('/:id', transController.editTransaction);
router.delete('/delete/:id', transController.deleteTransactionById);

module.exports = router;
