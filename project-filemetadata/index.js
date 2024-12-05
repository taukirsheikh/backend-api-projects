var express = require('express');
var cors = require('cors');
require('dotenv').config()
const fileManager = require('./fileManager')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use('/api/fileanalyse',fileManager)
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
