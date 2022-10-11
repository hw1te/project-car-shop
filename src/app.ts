import express from 'express';
import 'express-async-errors';
import carsRouter from './routes/carsRoute';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/cars', carsRouter);

app.use(errorMiddleware);
export default app;