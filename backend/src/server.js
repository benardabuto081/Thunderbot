const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.get('/health', function (req, res) {
  res.status(200).json({ status: 'ok' });
});

app.get('/orders/:id', async function (req, res) {
  const orderId = req.params.id;

  try {
    const result = await pool.query('SELECT id, status, delivery_date FROM orders WHERE id = $1', [orderId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = result.rows[0];
    res.status(200).json({
      orderId: order.id,
      status: order.status,
      deliveryDate: order.delivery_date,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, function () {
  console.log('Server is running on http://localhost:' + PORT);
});
