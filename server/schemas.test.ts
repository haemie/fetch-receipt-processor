import { validateReceiptSchema, validateIdSchema } from './schemas';
import { Item, Receipt } from './types'

const exampleReceipt1 = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: [
    {
      shortDescription: 'Mountain Dew 12PK',
      price: '6.49',
    },
  ],
  total: '35.35',
};

const exampleReceipt2 = {
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },
  ],
  "total": "9.00"
}

describe('Validate example receipts', () => {
  it('validates receipt1', () => {
    expect(validateReceiptSchema(exampleReceipt1)).toBe(true)
  });
  it('validates receipt2', () => {
    expect(validateReceiptSchema(exampleReceipt2)).toBe(true)
  });
})

describe('Invalidate bad receipts', () => {
  it('should invalidate a receipt missing a retailer', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.retailer;
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with an empty space retailer name', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, retailer: ' '}
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt missing a purchase date', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.purchaseDate;
    expect(validateReceiptSchema(badReceipt)).toBe(false)

  });

  it('should invalidate a receipt with an invalid purchase date', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, purchaseDate: '20200-09-09'}
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });
  
  it('should invalidate a receipt missing a purchase time', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.purchaseTime;
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with an invalid purchase time', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, purchaseTime: '30:00'}
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt missing items', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.items;
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with a no items', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, items: []}
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });
  
  it('should invalidate a receipt missing total', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.total;
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with invalid total', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, total: '12.345'}
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with invalid item description', async () => {
    const badItems : Item[] = {...exampleReceipt1.items};
    badItems[0].shortDescription = ' ';
    const badReceipt : Receipt = {...exampleReceipt1, items: badItems};
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });

  it('should invalidate a receipt with invalid item price', async () => {
    const badItems : Item[] = {...exampleReceipt1.items};
    badItems[0].price = '12.345';
    const badReceipt : Receipt = {...exampleReceipt1, items: badItems};
    expect(validateReceiptSchema(badReceipt)).toBe(false)
  });
})