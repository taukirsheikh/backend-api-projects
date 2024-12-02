const express = require('express');
const router = express.Router();
// Define routes for products
// router.get('/', (req, res) => {
//     res.json({ unix: Date.now(), utc: new Date().toUTCString() });
//   });
  // Function to check if a string is a valid date
function isValidDate(date) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }
  
  // Route to handle both Unix timestamp and date string
  // /:date? means that the date parameter is optional. If it's provided in the URL, it will be available in req.params.date. If it's not provided, req.params.date will be undefined.
// You can check if the parameter exists and handle both cases in your route logic.
  router.get('/:date?', function (req, res) {
    const { date } = req.params;
  
    let unix, utc;
  
    if (date) {
      // Case 1: If the date is a valid number (Unix timestamp)
      if (!isNaN(date)) {
        unix = parseInt(date);
        utc = new Date(unix).toUTCString();
      }
      // Case 2: If the date is a valid date string
      else if (isValidDate(date)) {
        unix = new Date(date).getTime();
        utc = new Date(date).toUTCString();
      }
      // Case 3: Invalid date input
      else {
        return res.json({ error: "Invalid Date" });
      }
    } else {
      // Case 4: No date provided, use current date and time
      const currentDate = new Date();
      unix = currentDate.getTime();
      utc = currentDate.toUTCString();
    }
  
    // Return the JSON response
    res.json({ unix, utc });
  });
  
  module.exports = router;