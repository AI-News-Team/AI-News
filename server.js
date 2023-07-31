const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
require('dotenv').config();
//const connectDB = require('localhost');

//connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const categoryRoutes = require('./route/Category.category.list');
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/category.list`);
});

module.exports = app;