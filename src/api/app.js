const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
if (process.env.ENV === 'Test') {
  const db = mongoose.connect('mongodb://localhost/companyAPI_test', {
    useNewUrlParser: true
  });
} else {
  const db = mongoose.connect('mongodb://localhost/companyAPI', {
    useNewUrlParser: true
  });
}

const port = process.env.PORT || 4000;
const Company = require('./model/companyModel');
const companyRouter = require('./route/companyRouter')(Company);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('CRUD API');
});
app.use('/api', companyRouter);
app.server = app.listen(port, () => {
  console.log(`port running on ${port}`);
});

module.exports = app;
