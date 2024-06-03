const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

router.post('/', auth, employeeController.addEmployee);
router.delete('/:id', auth, employeeController.deleteEmployee);
router.put('/:id', auth, employeeController.updateEmployee);
router.get('/search', auth, employeeController.searchEmployee);
router.get('/', auth, employeeController.getAllEmployees);

module.exports = router;
