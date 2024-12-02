const express = require('express');
const router = express.Router();

let urlStore = [];
let currentId = 1;

// Utility function to validate URLs
function isValidUrl(url) {
    if (typeof url !== 'string' || url.trim() === '') {
      return false; // Ensure input is a non-empty string
    }
  
    try {
      const parsedUrl = new URL(url); // Parse the URL
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'; // Validate protocol
    } catch {
      return false; // Invalid URL format
    }
  }
  

// POST endpoint to create a short URL
router.post('/shorturl', (req, res) => {
  console.log('req.body', req.body);
  const { url } = req.body;

  if (!isValidUrl(url)) {
    console.log('Invalid url', url);
    return res.json({ error: 'invalid url'});
  }

  // Check if the URL already exists in the store
  const existingEntry = urlStore.find((entry) => entry.original_url === url);
  if (existingEntry) {
    return res.json({
      original_url: existingEntry.original_url,
      short_url: existingEntry.short_url,
    });
  }

  // Create a new entry
  const newEntry = { original_url: url, short_url: currentId++ };
  urlStore.push(newEntry);

  res.json({ original_url: newEntry.original_url, short_url: newEntry.short_url });
});

// GET endpoint to redirect to the original URL
router.get('/shorturl/:short_url', (req, res) => {
  const shortUrlId = parseInt(req.params.short_url, 10);

  const entry = urlStore.find((item) => item.short_url === shortUrlId);
  if (!entry) {
    return res.status(404).json({ error: 'No short URL found for the given input' });
  }

  res.redirect(entry.original_url);
});

module.exports = router;
