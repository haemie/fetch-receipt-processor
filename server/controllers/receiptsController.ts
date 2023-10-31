const pointCalculation = require('../pointCalculation');
import { Request, Response, NextFunction } from 'express';
import {v4 as uuidv4} from 'uuid';
import { Receipt, SavedPoints } from '../types'
import { validateReceiptSchema, validateIdSchema } from '../schemas';

const savedPoints : SavedPoints = new Map();

module.exports = {
  // validate input receipt according to given requirements
  validateReceipt: (req: Request, res: Response, next: NextFunction) => {
    if (!validateReceiptSchema(req.body)) {
      // console.log(validateReceiptSchema.errors)
      return res.status(400).json('The receipt is invalid');
    } else {
      return next();
    }
  },
  validateId: (req: Request, res: Response, next: NextFunction) => {
    if (!validateIdSchema(req.params.id)) {
      return res.status(400).json('The id is invalid');
    } else {
      return next();
    }
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
