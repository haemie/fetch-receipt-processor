const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const pointCalculation = require('./pointCalculation');
const { v4: uuidv4 } = require('uuid');

const savedPoints = new Map();

app.use(cors());
app.use(express.json());

// handler for post requests to /receipts/process
app.post('/receipts/process', (req, res) => {
  console.log('receipt process request received');
  const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
  let points =
    pointCalculation.retailerName(retailer) +
    pointCalculation.roundTotal(total) +
    pointCalculation.roundQuarterTotal(total) +
    pointCalculation.itemsCount(items) +
    pointCalculation.itemDescriptionCheck(items) +
    pointCalculation.oddDay(purchaseDate) +
    pointCalculation.twoToFour(purchaseDate, purchaseTime);
  const receiptID = uuidv4();
  savedPoints.set(receiptID, points);
  res.status(200).json(receiptID);
});

app.listen(port, () => {
  console.log(`receipt processor listening on port ${port}`);
});
