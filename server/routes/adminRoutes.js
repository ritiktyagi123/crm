const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', auth, adminController.getAdmin);

module.exports = router;
