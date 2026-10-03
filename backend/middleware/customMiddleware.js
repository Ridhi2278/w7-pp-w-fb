const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  logger.info(req.method, req.path);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };