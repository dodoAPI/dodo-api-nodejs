import KeyAuthType = require('./key-auth-type');

/**
 * Key auth data
 */
type KeyAuthData = {
  /**
   * Auth key
   */
  key: string;
  /**
   * Auth key value
   */
  value: string;

  /**
   * Auth key edded to ('HEADER' | 'QUERY')
   */
  keyAuthType?: KeyAuthType;
};

export = KeyAuthData;
