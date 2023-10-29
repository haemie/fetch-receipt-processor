const exampleReceipt1 = {
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

const exampleReceipt2 = {
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

describe('Passes example receipts', async () => {
  it('should fulfill example receipt 1', async () => {
    const response = await fetch('/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ receipt: exampleReceipt1 }),
    });
    expect(response).toBe(exampleResult1);
  });

  it('should fulfill example receipt 2', async () => {
    const response = await fetch('/receipts/process', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ receipt: exampleReceipt2 }),
    });
    expect(response).toBe(exampleResult2);
  });
});
