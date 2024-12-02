const express = require('express');
const router = express.Router();

// Define the /api/whoami endpoint
router.get('/whoami', (req, res) => {
  const ipaddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress,
    language,
    software,
  });
});

module.exports = router;
