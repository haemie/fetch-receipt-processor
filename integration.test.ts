const pointCalculation = require('./server/pointCalculation');
import { Item, Receipt } from './server/types'


const exampleReceipt1 : Receipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: [
    {
      shortDescription: 'Mountain Dew 12PK',
      price: '6.49',
    },
    {
      shortDescription: 'Emils Cheese Pizza',
      price: '12.25',
    },
    {
      shortDescription: 'Knorr Creamy Chicken',
      price: '1.26',
    },
    {
      shortDescription: 'Doritos Nacho Cheese',
      price: '3.35',
    },
    {
      shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
      price: '12.00',
    },
  ],
  total: '35.35',
};

const exampleResult1 = 28;

const exampleReceipt2 : Receipt = {
  retailer: 'M&M Corner Market',
  purchaseDate: '2022-03-20',
  purchaseTime: '14:33',
  items: [
    {
      shortDescription: 'Gatorade',
      price: '2.25',
    },
    {
      shortDescription: 'Gatorade',
      price: '2.25',
    },
    {
      shortDescription: 'Gatorade',
      price: '2.25',
    },
    {
      shortDescription: 'Gatorade',
      price: '2.25',
    },
  ],
  total: '9.00',
};

const exampleResult2 = 109;

describe('Passes example receipts', () => {
  it('should fulfill example receipt 1', async () => {
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(exampleReceipt1),
    });
    const receiptID = await postResponse.json();
    const pointResponse = await fetch(
      `http://localhost:3000/receipts/${receiptID.id}/points`
    );
    const points = await pointResponse.json();
    await expect(Number(points.points)).toBe(exampleResult1);
  });

  it('should fulfill example receipt 2', async () => {
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(exampleReceipt2),
    });
    const receiptID = await postResponse.json();
    const pointResponse = await fetch(
      `http://localhost:3000/receipts/${receiptID.id}/points`
    );
    const points = await pointResponse.json();
    await expect(Number(points.points)).toBe(exampleResult2);
  });
});

describe('Fails bad receipts', () => {
  it('should fail a receipt missing a retailer', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.retailer;
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with an empty space retailer name', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, retailer: ' '}
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt missing a purchase date', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.purchaseDate;
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with an invalid purchase date', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, purchaseDate: '20200-09-09'}
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });
  
  it('should fail a receipt missing a purchase time', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.purchaseTime;
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with an invalid purchase time', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, purchaseTime: '30:00'}
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt missing items', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.items;
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with a no items', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, items: []}
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });
  
  it('should fail a receipt missing total', async () => {
    const badReceipt : Partial<Receipt> = {}
    Object.assign(badReceipt, exampleReceipt1)
    delete badReceipt.total;
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with invalid total', async () => {
    const badReceipt : Receipt = {...exampleReceipt1, total: '12.345'}
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with invalid item description', async () => {
    const badItems : Item[] = {...exampleReceipt1.items};
    badItems[0].shortDescription = ' ';
    const badReceipt : Receipt = {...exampleReceipt1, items: badItems};
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });

  it('should fail a receipt with invalid item price', async () => {
    const badItems : Item[] = {...exampleReceipt1.items};
    badItems[0].price = '12.345';
    const badReceipt : Receipt = {...exampleReceipt1, items: badItems};
    const postResponse = await fetch('http://localhost:3000/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(badReceipt),
    });
    const receiptID = await postResponse.json();
    expect(postResponse.status).toBe(400)
    await expect(receiptID).toBe('The receipt is invalid');
  });
});