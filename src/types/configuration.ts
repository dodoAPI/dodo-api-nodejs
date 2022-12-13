import AuthType = require('./auth-type');
import BasicAuthData = require('./badic-auth-data');
import KeyAuthData = require('./key-auth-data');

/**
 * Configuration for dodoAPI instance
 */
type Configuration = {
  /**
   * Name of the API
   */
  account: string;

  /**
   * Name of the API
   */
  api: string;

  /**
   * Auth type of the API ('NONE' | 'BASIC' | 'KEY')
   */
  authType?: AuthType | undefined;

  /**
   * Basic auth data. In case authType is 'BASIC'
   */
  basicAuthData?: BasicAuthData;

  /**
   * Key auth data. In case authType is 'KEY'
   */
  keyAuthData?: KeyAuthData;
};

export = Configuration;
