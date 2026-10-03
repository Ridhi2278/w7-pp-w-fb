const app = require('./app');
const connectDB = require('./config/db');
const config = require('./utils/config');
const logger = require('./utils/logger');

connectDB();

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});