import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();

dotenv.config();

connectDB();
app.get('/', (req, res) => {
  res.send('api is running at 5000');
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
