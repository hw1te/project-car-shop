import express from 'express';
import 'express-async-errors';
import carsRoute from './routes/carRoute';
import errorHandler from './middleware/errorMiddleware';

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use('/cars', carsRoute);

export default app;