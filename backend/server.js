import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

app.use(express.json());

dotenv.config();

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send('api is running at 5000');
  });
}

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/razorpay', (req, res) =>
  res.send(process.env.RAZORPAY_KEY_ID)
);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
