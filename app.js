const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
    origin:"http://localhost:3000"
}))


// accessing config.env files
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
DB = process.env.DB;
PORT = process.env.PORT || 5000;

// using body-parser
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connecting to database
require('./db/conn');
app.use(express.json());

app.use(require('./router/auth'))

app.listen(PORT, () => {
    console.log(`server is connected to port ${PORT}`);
})