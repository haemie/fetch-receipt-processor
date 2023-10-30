const pointCalculation = require('./pointCalculation');

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

describe('point calculations for example receipt 1', () => {
  test('points for 6 long retailer name', () => {
    expect(pointCalculation.retailerName(exampleReceipt1.retailer)).toBe(6);
  });
  test('points for non round number total', () => {
    expect(pointCalculation.roundTotal(exampleReceipt1.total)).toBe(0);
  });
  test('points for total not payable using quarters', () => {
    expect(pointCalculation.roundQuarterTotal(exampleReceipt1.total)).toBe(0);
  });
  test('points for 5 items', () => {
    expect(pointCalculation.itemsCount(exampleReceipt1.items)).toBe(10);
  });
  test('points for item descriptions', () => {
    expect(pointCalculation.itemDescriptionCheck(exampleReceipt1.items)).toBe(
      6
    );
  });
  test('points for odd purchase date', () => {
    expect(pointCalculation.oddDay(exampleReceipt1.purchaseDate)).toBe(6);
  });
  test('points for non 2-4pm', () => {
    expect(
      pointCalculation.twoToFour(
        exampleReceipt1.purchaseDate,
        exampleReceipt1.purchaseTime
      )
    ).toBe(0);
  });
});

describe('point calculations for example receipt 2', () => {
  test('points for retailer name with non alphanumerics', () => {
    expect(pointCalculation.retailerName(exampleReceipt2.retailer)).toBe(14);
  });
  test('points for round number total', () => {
    expect(pointCalculation.roundTotal(exampleReceipt2.total)).toBe(50);
  });
  test('points for total payable using quarters', () => {
    expect(pointCalculation.roundQuarterTotal(exampleReceipt2.total)).toBe(25);
  });
  test('points for 4 items', () => {
    expect(pointCalculation.itemsCount(exampleReceipt2.items)).toBe(10);
  });
  test('points for item descriptions', () => {
    expect(pointCalculation.itemDescriptionCheck(exampleReceipt2.items)).toBe(
      0
    );
  });
  test('points for even purchase date', () => {
    expect(pointCalculation.oddDay(exampleReceipt2.purchaseDate)).toBe(0);
  });
  test('points for 2-4pm', () => {
    expect(
      pointCalculation.twoToFour(
        exampleReceipt2.purchaseDate,
        exampleReceipt2.purchaseTime
      )
    ).toBe(10);
  });
});

// describe('Passes example receipts', async () => {
//   it('should fulfill example receipt 1', async () => {
//     const response = await fetch('/receipts/process', {
//       method: 'post',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ exampleReceipt1 }),
//     });
//     expect(response).toBe(exampleResult1);
//   });

//   it('should fulfill example receipt 2', async () => {
//     const response = await fetch('/receipts/process', {
//       method: 'post',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ exampleReceipt2 }),
//     });
//     expect(response).toBe(exampleResult2);
//   });
// });
