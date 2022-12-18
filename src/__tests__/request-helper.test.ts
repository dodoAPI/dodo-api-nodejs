import { buildRequestConfig, buildSearchOptions, getRequestConfigCopy, sendRequest } from '../helpers/request-helper';
import Constants from '../constants/constants';
import Configuration from '../types/configuration';
import ListOptions from '../types/list-options';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import CustomError from '../types/custom-error';

describe('buildRequestConfig', () => {
  test('should throw an error if API account was not provided', () => {
    const t = () => buildRequestConfig({ account: '', api: 'test' });

    expect(t).toThrow(Error);
    expect(t).toThrow(Constants.messages.configuration.missingAccount);
  });

  test('should throw an error if API name was not provided', () => {
    const t = () => buildRequestConfig({ account: 'test', api: '' });

    expect(t).toThrow(Error);
    expect(t).toThrow(Constants.messages.configuration.missingApiName);
  });

  test('should throw an error if username of BASIC auth was not provided', () => {
    const t = () => buildRequestConfig({ account: 'test', api: 'test', authType: 'BASIC' });

    expect(t).toThrow(Error);
    expect(t).toThrow(Constants.messages.configuration.missingUsername);
  });

  test('should throw an error if password of BASIC auth was not provided', () => {
    const t = () =>
      buildRequestConfig({
        account: 'test',
        api: 'test',
        authType: 'BASIC',
        basicAuthData: { username: 'test', password: '' },
      });

    expect(t).toThrow(Error);
    expect(t).toThrow(Constants.messages.configuration.missingPassword);
  });

  test('should properly init NONE auth config', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
    };

    const t = buildRequestConfig(configuration);

    expect(t.baseURL).toBe(`${Constants.baseURL}/${configuration.account}/${configuration.api}`);
  });

  test('should properly init BASIC auth config', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
      authType: 'BASIC',
      basicAuthData: {
        username: 'username',
        password: 'password',
      },
    };

    const t = buildRequestConfig(configuration);

    expect(t.baseURL).toBe(`${Constants.baseURL}/${configuration.account}/${configuration.api}`);
    expect(t.auth).not.toBeNull();
    expect(t.auth).toEqual({
      username: configuration.basicAuthData?.username,
      password: configuration.basicAuthData?.password,
    });
  });

  test('should properly init KEY auth config with no keyAuthType', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
      authType: 'KEY',
      keyAuthData: {
        key: 'key',
        value: 'value',
      },
    };

    const t = buildRequestConfig(configuration);

    expect(t.baseURL).toBe(`${Constants.baseURL}/${configuration.account}/${configuration.api}`);
    expect(t.headers).not.toBeNaN();
    expect(t.headers).toEqual({ key: 'value' });
  });

  test('should properly init KEY auth config with keyAuthType QUERY', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
      authType: 'KEY',
      keyAuthData: {
        key: 'key',
        value: 'value',
        keyAuthType: 'QUERY',
      },
    };

    const t = buildRequestConfig(configuration);

    expect(t.baseURL).toBe(`${Constants.baseURL}/${configuration.account}/${configuration.api}`);
    expect(t.params).not.toBeNaN();
    expect(t.params).toEqual({ key: 'value' });
  });

  test('should properly init KEY auth config with keyAuthType HEADER', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
      authType: 'KEY',
      keyAuthData: {
        key: 'key',
        value: 'value',
        keyAuthType: 'HEADER',
      },
    };

    const t = buildRequestConfig(configuration);

    expect(t.baseURL).toBe(`${Constants.baseURL}/${configuration.account}/${configuration.api}`);
    expect(t.headers).not.toBeNaN();
    expect(t.headers).toEqual({ key: 'value' });
  });
});

describe('getRequestConfigCopy', () => {
  test('should create a deep copy of an request config object', () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
      params: {
        id: 'id',
        key: 'key',
      },
    };
    const t = getRequestConfigCopy(baseConfig);

    expect(t).not.toBe(baseConfig);
    expect(t).toEqual(baseConfig);
  });
});

describe('buildSearchOptions', () => {
  const cases: any[][] = [
    [{}, {}],
    [{ sortBy: 'sortBy' }, { [Constants.searchOptions.sortBy]: 'sortBy' }],
    [{ sortOrder: 'ASC' }, { [Constants.searchOptions.sortOrder]: 'ASC' }],
    [{ pagerPage: 2 }, { [Constants.searchOptions.pagerPage]: 2 }],
    [{ pagerSize: 3 }, { [Constants.searchOptions.pagerSize]: 3 }],
    [{ searchBy: 'searchBy' }, { [Constants.searchOptions.searchBy]: 'searchBy' }],
    [{ searchOperator: 'like' }, { [Constants.searchOptions.searchOperator]: 'like' }],
    [{ searchValues: 'searchValues' }, { [Constants.searchOptions.searchValues]: 'searchValues' }],
  ];

  test.each(cases)('given options: %p should return %p', (options: ListOptions, params: any) => {
    const t = buildSearchOptions(options);
    expect(t).toEqual(params);
  });
});

describe('sendRequest', () => {
  jest.mock('axios');

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call axios request', async () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
    };

    const requestData = { foo: 'bar' };
    axios.request = jest.fn().mockResolvedValue({ data: requestData });

    await sendRequest(baseConfig);

    expect(axios.request).toHaveBeenCalledWith(baseConfig);
  });

  test('should return request data', async () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
    };

    const requestData = { foo: 'bar' };
    axios.request = jest.fn().mockResolvedValue({ data: requestData });

    const t = await sendRequest(baseConfig);

    expect(t).toBe(requestData);
  });

  test('should throw custom error and message if it is axios error', async () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
    };

    axios.request = jest.fn().mockImplementation(() => {
      throw new AxiosError();
    });

    const t = async () => sendRequest(baseConfig);

    await expect(t).rejects.toThrow(Constants.messages.response.error);
    await expect(t).rejects.toThrow(CustomError);
  });

  test('should throw custom error and message if it is axios error', async () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
    };

    const responseData: any = { foo: 'bar' };

    axios.request = jest.fn().mockImplementation(() => {
      throw new AxiosError('error', undefined, undefined, undefined, {
        status: 1,
        statusText: 'error',
        config: {},
        headers: {},
        data: responseData,
      });
    });

    let t: any = null;
    try {
      await sendRequest(baseConfig);
    } catch (err) {
      t = err;
    }

    expect(t).not.toBeNull();
    expect(t.response).toBe(responseData);
  });

  test('should throw same error if it is not axios error', async () => {
    const baseConfig = {
      baseURL: 'baseURL',
      auth: {
        username: 'username',
        password: 'password',
      },
    };

    axios.request = jest.fn().mockImplementation(() => {
      throw new Error('error');
    });

    const t = async () => sendRequest(baseConfig);

    await expect(t).rejects.toThrow(Error);
    await expect(t).rejects.toThrow('error');
  });
});
