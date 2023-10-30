const pointCalculation = require('../pointCalculation');
import { Request, Response, NextFunction } from 'express';
import {v4 as uuidv4} from 'uuid';
import { Receipt, SavedPoints } from '../types'

const savedPoints : SavedPoints = new Map();

module.exports = {
  validateReceipt: (req: Request, res: Response, next: NextFunction) => {

  },
  // handler for POST requests to /receipts/process
  processReceipt: (req: Request, res: Response, next: NextFunction) => {
    // console.log('receipt process request received');
    const receipt: Receipt = req.body;
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    let points : number =
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
  getPoints: (req: Request, res: Response, next: NextFunction) => {
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
