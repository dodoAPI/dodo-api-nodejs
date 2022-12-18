import ErrorResponse from './error-response';

/**
 * Custom response error type
 */
class CustomError extends Error {
  constructor(message: string, response: ErrorResponse) {
    super(message);
    this.response = response;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  response: ErrorResponse;
}

export = CustomError;
