const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();
app.use(bodyParser.json());
app.use(express.static(PUBLIC_DIR));

module.exports = app;
