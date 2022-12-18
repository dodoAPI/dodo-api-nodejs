/**
 * Custom error type returned by dodoAPI
 */
type ErrorMessage = {
  /**
   * Custom error code
   */
  error: number;
  /**
   * Custom error message
   */
  message: string;
};

export = ErrorMessage;
