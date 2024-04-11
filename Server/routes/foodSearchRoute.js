const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Endpoint to search for foods
router.get('/foodSearch', async (req, res) => {
  const { query } = req.query;
  const API_KEY = process.env.USDA_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not found' });
  }

  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=AGFY1O8leyDp6B0ate9P5Fdude3dD9v4id44ML1U
    &query=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: JSON.stringify('Failed to fetch data from USDA API') });
  }
});

module.exports = router;
