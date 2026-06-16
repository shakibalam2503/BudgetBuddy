const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, incomeController.getIncomes);
router.post('/', authenticateToken, incomeController.createIncome);

module.exports = router;
