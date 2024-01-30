import express from 'express';
import morgan from 'morgan';
import { stream } from './logger';
import { api } from './routes/index';

const app = express();

app.use(morgan('combined', { stream }));

app.use('/api', api);

export default app;
