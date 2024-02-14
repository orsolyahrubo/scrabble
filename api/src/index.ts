import logger from './logger';
import config from './config';
import app from './app';
import './db';

const PORT = config.port || 8081;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});