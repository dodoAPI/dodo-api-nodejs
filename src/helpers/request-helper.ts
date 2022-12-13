import Constants from '../constants/constants';
import Configuration from '../types/configuration';
import ListOptions from '../types/list-options';

const buildRequestConfig = (configuration: Configuration): any => {
  if (!configuration?.account) throw new Error(Constants.messages.configuration.missingAccount);

  if (!configuration?.api) throw new Error(Constants.messages.configuration.missingApiName);

  const config: any = {
    baseURL: `${Constants.baseURL}/${configuration.account}/${configuration.api}`,
  };

  if (configuration?.authType === 'BASIC') {
    if (!configuration.basicAuthData?.username) throw new Error(Constants.messages.configuration.missingUsername);

    if (!configuration.basicAuthData?.password) throw new Error(Constants.messages.configuration.missingPassword);

    config.auth = {
      username: configuration.basicAuthData.username,
      password: configuration.basicAuthData.password,
    };
  }

  if (configuration?.authType === 'KEY') {
    if (!configuration.keyAuthData?.key) throw new Error(Constants.messages.configuration.missingKey);

    if (configuration.keyAuthData?.keyAuthType === 'QUERY') {
      config.params = {
        [configuration.keyAuthData.key]: configuration.keyAuthData.value,
      };
    } else {
      config.headers = {
        [configuration.keyAuthData.key]: configuration.keyAuthData.value,
      };
    }
  }

  return config;
};

const getRequestConfigCopy = (config: any) => {
  return JSON.parse(JSON.stringify(config));
};

const buildSearchOptions = (options?: ListOptions) => {
  const params: any = {};

  if (options?.sortBy) params[Constants.searchOptions.sortBy] = options.sortBy;
  if (options?.sortOrder) params[Constants.searchOptions.sortOrder] = options.sortOrder;
  if (options?.pagerPage) params[Constants.searchOptions.pagerPage] = options.pagerPage;
  if (options?.pagerSize) params[Constants.searchOptions.pagerSize] = options.pagerSize;
  if (options?.searchBy) params[Constants.searchOptions.searchBy] = options.searchBy;
  if (options?.searchOperator) params[Constants.searchOptions.searchOperator] = options.searchOperator;
  if (options?.searchValues) params[Constants.searchOptions.searchValues] = options.searchValues;

  return params;
};

export { buildRequestConfig, getRequestConfigCopy, buildSearchOptions };
