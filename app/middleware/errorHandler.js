const LOGIN_PASSWORD_FAILED = 'LOGIN_PASSWORD_FAILED';

const errorResponses = {
  [LOGIN_PASSWORD_FAILED]: {
    message: 'Invalid email/password combination.',
    status: 403,
  },
};

module.exports = {
  errorHandlerMiddleware(err, req, res, next) {
    if (err.code
        && Object.keys(errorResponses).includes(err.code)
        && errorResponses[err.code].message
        && errorResponses[err.code].status) {
      const logger = req.app.get('logger');
      logger.error('Error:', err);
      return res.status(errorResponses[err.code].status).json({
        errors: [{
          detail: errorResponses[err.code].message,
        }],
      });
    }

    return next(err);
  },
  LOGIN_PASSWORD_FAILED,
};
