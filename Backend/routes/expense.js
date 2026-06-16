const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, expenseController.getExpenses);
router.post('/', authenticateToken, expenseController.createExpense);
router.delete('/:id', authenticateToken, expenseController.deleteExpense);

module.exports = router;
