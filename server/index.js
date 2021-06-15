const express = require('express');
const path = require('path');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
require('dotenv').config();

const app = express();
const PORT = 42069;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

// GET
app.get('/api', (req, res) => {
  const { endpoint, params } = req.query;
  const options = {
    url: `${config.API_HOST}/${endpoint}`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      Authorization: `${process.env.GIT_KEY}`,
    },
    params: JSON.parse(params),
  };
  axios(options)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// POST
app.post('/api', (req, res) => {
  const { endpoint, data } = req.body;
  const options = {
    url: `${config.API_HOST}/${endpoint}`,
    method: 'POST',
    headers: {
      'User-Agent': 'request',
      Authorization: `${process.env.GIT_KEY}`,
    },
    data,
  };
  axios(options)
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// PUT
app.put('/api', (req, res) => {
  const { endpoint, params } = req.body;
  const options = {
    url: `${config.API_HOST}/${endpoint}`,
    method: 'PUT',
    headers: {
      'User-Agent': 'request',
      Authorization: `${process.env.GIT_KEY}`,
    },
    params,
  };
  axios(options)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST PHOTOS
app.post('/photos', (req, res) => {
  const { fileData } = req.body;
  cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
  });
  // const stream = cloudinary.uploader.upload_stream((err, result) => {
  //   // console.log(result);
  //   res.send(result.url);
  // });
  // fs.createReadStream(fileData).pipe(stream);
  cloudinary.uploader.upload(fileData, (err, result) => {
    if (err) { throw new Error(err); }
    res.send(result.url);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
