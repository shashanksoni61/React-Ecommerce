import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

dotenv.config();

connectDB();

app.get('/', (req, res) => {
  res.send('api is running at 5000');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
