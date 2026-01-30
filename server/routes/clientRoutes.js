const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('../config/cloudinaryConfig');

router.post('/', upload.single('image'), clientController.createClient);
router.get('/', clientController.getClients);

module.exports = router;
