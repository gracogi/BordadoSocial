const express = require('express');
const cors = require('cors');
const db = require('./setup');

const app = express();
app.use(cors());
app.use(express.json());

// suas rotas...
