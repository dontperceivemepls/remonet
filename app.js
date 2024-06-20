const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./js/users');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error signing in' });
    } else if (!user) {
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      if (user.password === password) {
        res.send({ message: 'Signed in successfully' });
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});