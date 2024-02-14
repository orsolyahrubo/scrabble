import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

const DB_URI = config.db.uri || 'mongodb://127.0.0.1:27018/';

mongoose.set('strictQuery', true);

mongoose.connect(DB_URI, {})
    .then(() => {
        logger.info(`Connected to MongoDB - ${DB_URI}`);
    })
    .catch((err) => {
        logger.error(err);
    });