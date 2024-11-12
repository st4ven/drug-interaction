import express from "express";
const app = express();
import { checkInteractions } from './queries.js';
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
app.get('/check-interaction', async (req, res) => {
  const {drug1, drug2, drug3, drug4, drug5, drug6} = req.query;
  const drugs = [drug1, drug2, drug3, drug4, drug5, drug6].filter(Boolean);


  const interactions = await checkInteractions(drugs);

  res.json({interactions});
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
  })

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});