import logger from './logger.js';
import config from './config.js';
import app from './app.js';

const PORT = config.port || 8081;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});