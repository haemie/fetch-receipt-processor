const pointCalculation = require('../pointCalculation');
const { v4: uuidv4 } = require('uuid');

const savedPoints = new Map();

module.exports = {
  // handler for POST requests to /receipts/process
  processReceipt: (req, res, next) => {
    // console.log('receipt process request received');
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
    let points =
      pointCalculation.retailerName(retailer) +
      pointCalculation.roundTotal(total) +
      pointCalculation.roundQuarterTotal(total) +
      pointCalculation.itemsCount(items) +
      pointCalculation.itemDescriptionCheck(items) +
      pointCalculation.oddDay(purchaseDate, purchaseTime) +
      pointCalculation.twoToFour(purchaseDate, purchaseTime);
    const receiptID = uuidv4();
    savedPoints.set(receiptID, points);
    res.locals.id = receiptID;
    return next();
  },
  // handler for GET requests to /receipts/:id/points
  getPoints: (req, res, next) => {
    // console.log('receipt get points request received');
    const targetID = req.params.id;
    if (savedPoints.has(targetID)) {
      const pointsValue = savedPoints.get(targetID);
      res.locals.points = pointsValue;
      return next();
    }
    return res.status(404).json('No receipt found for that id');
  },
};