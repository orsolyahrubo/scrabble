import express from 'express';
import morgan from 'morgan';
import { stream } from './logger';
import { api, swagger } from './routes/index';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream }));

app.use('/api', api);
app.use('/api-docs', swagger);

app.use(errorHandler);

export default app;
