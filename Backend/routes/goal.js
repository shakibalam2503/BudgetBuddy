const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, goalController.getGoals);
router.post('/', authenticateToken, goalController.createGoal);
router.post('/:id/savings', authenticateToken, goalController.addSavings);

module.exports = router;
