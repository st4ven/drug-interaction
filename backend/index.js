// app.js
const express = require('express');
const app = express();
const {checkInteractions} = require('./queries');
const cors = require('cors');
const corsOptions = {
  origin: "https://drug-interaction.vercel.app", credentials: true
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://drug-interaction.vercel.app');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/check-interaction', async (req, res) => {
  const {drug1, drug2, drug3, drug4, drug5, drug6} = req.query;
  const drugs = [drug1, drug2, drug3, drug4, drug5, drug6].filter(Boolean);


  const interactions = await checkInteractions(drugs);

  res.json({interactions});
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});