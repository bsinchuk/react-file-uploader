const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});

app.get('/test', (req, res) => {
  res.send({status: 'all is ok'});
});

