require('dotenv').config()
const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser')
const port = 8000;
const s3Methods = require('../S3seed');
const createPhotoSchema = require('../PhotoSeed');

app.use(bodyParser.urlencoded({extended: false}))

app.get('/photos/:itemId', (req, res) => {
  res.send('Hello');
})

app.get('/', (req, res) => {
  console.log(createPhotoSchema())
  console.log(s3Methods.getImages())
  res.send({
    message: 'Hello World'
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
