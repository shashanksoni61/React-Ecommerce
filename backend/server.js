const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('api is running at 5000');
});

const PORT = process.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
