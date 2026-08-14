const express = require('express');

const app = express();
const PORT = 3000;

app.get('/health', function (req, res) {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, function () {
  console.log('Server is running on http://localhost:' + PORT);
});
