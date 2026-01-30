const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../config/cloudinaryConfig');

router.post('/', upload.single('image'), projectController.createProject);
router.get('/', projectController.getProjects);

module.exports = router;
