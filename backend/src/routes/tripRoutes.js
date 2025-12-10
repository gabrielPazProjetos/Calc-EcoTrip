const express = require('express');
const { calculateTrip } = require('../controllers/tripController');

const router = express.Router();

router.post('/calculate', calculateTrip);

module.exports = router;
