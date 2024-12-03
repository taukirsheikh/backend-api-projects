const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON body
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('Connected to MongoDB')
}).catch((err)=>{
  console.log(err)
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api', require('./routes/exercise'))




const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
