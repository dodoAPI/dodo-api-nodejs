import ErrorMessage = require('./error-message');

/**
 * Error response returned by dodoAPI containing list of errors
 */
type ErrorResponse = {
  /**
   * List of errors
   */
  errors: ErrorMessage[];
};

export = ErrorResponse;
