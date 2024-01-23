import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';
import { api } from './routes/index.js';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);

export default app;