const express = require('express');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');

router.post('/process', receiptsController.processReceipt, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/:id/points', receiptsController.getPoints, (req, res) => {
  return res.status(200).json(res.locals);
});

module.exports = router;
