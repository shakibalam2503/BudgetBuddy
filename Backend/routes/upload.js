const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/', authenticateToken, upload.single('receipt'), uploadController.uploadFile);

module.exports = router;
