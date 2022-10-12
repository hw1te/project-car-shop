import express from 'express';
import 'express-async-errors';
import carsRouter from './routes/carsRoute';
import motorcyclesRouter from './routes/motorcyclesRoute';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/cars', carsRouter);
app.use('/motorcycles', motorcyclesRouter);

app.use(errorMiddleware);
export default app;