const express = require('express');
const path = require('path');
const axios = require('axios');
const config = require('../config/config');
require('dotenv').config();

const app = express();
const PORT = 42069;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

// routes
app.get('/api', (req, res) => {
  const { endpoint, params } = req.body;
  const options = {
    url: `${config.API_HOST}/${endpoint}`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      Authorization: `${process.env.GIT_KEY}`,
    },
    params,
  };

  axios(options)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
