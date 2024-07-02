const express = require('express');
const dotenv = require('dotenv');
const api = require('./routes/index');
const cors = require('cors');
const connectDB = require('./helpers/dbCon');

dotenv.config();
const app = express();
const port = process.env.PORT;
// app.use(express.json());
app.use(express.json({ extended: false }));
app.use(cors());
connectDB();
app.use("/", api);

module.exports = { app, port }