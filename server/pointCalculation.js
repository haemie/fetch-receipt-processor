module.exports = {
  // One point for every alphanumeric character in the retailer name.
  retailerName: (retailer) => {
    const alphanumericRetailer = retailer
      .split('')
      .filter((e) => /[a-zA-Z0-9]/.test(e));
    return alphanumericRetailer.length;
  },
  // 50 points if the total is a round dollar amount with no cents.
  roundTotal: (total) => {
    if (Number(total) % 1 === 0) {
      return 50;
    } else {
      return 0;
    }
  },
  // 25 points if the total is a multiple of 0.25.
  roundQuarterTotal: (total) => {
    if (Number(total) % 0.25 === 0) {
      return 25;
    } else {
      return 0;
    }
  },
  // 5 points for every two items on the receipt.
  itemsCount: (items) => {
    return Math.floor(items.length / 2) * 5;
  },
  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  itemDescriptionCheck: (items) => {
    let points = 0;
    items.forEach((e) => {
      const { shortDescription, price } = e;
      const trimmedDescription = shortDescription.trim(); // remove leading and tailing spaces from desc
      if (trimmedDescription && trimmedDescription.length % 3 === 0) {
        // if there is no shortDescription, default to 0
        points += Math.ceil(Number(price || 0) * 0.2); // if there is no price, default to 0
      }
    });
    return points;
  },
  // 6 points if the day in the purchase date is odd
  oddDay: (purchaseDate, purchaseTime) => {
    const date = new Date(`${purchaseDate}T${purchaseTime}:00Z`);
    const day = date.getUTCDate();
    if (day % 2 === 1) {
      return 6;
    } else {
      return 0;
    }
  },
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  twoToFour: (purchaseDate, purchaseTime) => {
    const date = new Date(`${purchaseDate}T${purchaseTime}:00Z`);
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    if (hour >= 14 && hour < 16) {
      if (minute !== 0) return 10;
    }
    return 0;
  },
};
