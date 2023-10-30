const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const receiptsRouter = require('./routers/receiptsRouter');

app.use(express.json());

app.use('/receipts', receiptsRouter);

// return an error status for all other requests
app.use((req, res) => {
  return res.status(404).json('endpoint does not exist!');
});

app.listen(port, () => {
  console.log(`receipt processor listening on port ${port}`);
});
