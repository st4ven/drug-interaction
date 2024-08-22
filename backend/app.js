// app.js
const express = require('express');
const app = express();
const {checkInteractions} = require('./queries');
const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));

app.get('/check-interaction', async (req, res) => {
  const {drug1, drug2, drug3, drug4, drug5} = req.query;
  const drugs = [drug1, drug2, drug3, drug4, drug5].filter(Boolean);


  const interactions = await checkInteractions(drugs);

  res.json({interactions});
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});