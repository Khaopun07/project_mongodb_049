const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/schools', schoolController.getSchools);
router.post('/schools', schoolController.createSchool);
router.get('/schools/:id', schoolController.getSchoolById);
router.put('/schools/:id', schoolController.updateSchool);
router.delete('/schools/:id', schoolController.deleteSchool);

module.exports = router;
