import dodoAPI from '..';
import { buildRequestConfig, getRequestConfigCopy, sendRequest } from '../helpers/request-helper';
import Configuration from '../types/configuration';

jest.mock('../helpers/request-helper');
const mockedBuildRequestConfig = <jest.Mock<typeof buildRequestConfig>>buildRequestConfig;
const mockedGetRequestConfigCopy = <jest.Mock<typeof getRequestConfigCopy>>getRequestConfigCopy;
const configuration = <Configuration>{
  account: 'account',
  api: 'api',
};

describe('dodoAPI', () => {
  test('should build and set base request config on dodoAPI instantiation', () => {
    const baseConfig: any = { baseUrl: 'baseUrl' };
    mockedBuildRequestConfig.mockReturnValue(baseConfig);

    const t = new dodoAPI(configuration);

    expect(mockedBuildRequestConfig).toHaveBeenCalledWith(configuration);
    expect(t.baseConfig).toBe(baseConfig);
  });

  describe('add', () => {
    test('should get request config copy', async () => {
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.add(data);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'post', data: data };

      const t = new dodoAPI(configuration);
      await t.add(data);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });

  describe('edit', () => {
    test('should get request config copy', async () => {
      const id = '123';
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.edit(id, data);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const id = '123';
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'put', url: `/${id}`, data: data };

      const t = new dodoAPI(configuration);
      await t.edit(id, data);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });

  describe('getById', () => {
    test('should get request config copy', async () => {
      const id = '123';
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.getById(id);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const id = '123';
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'get', url: `/${id}` };

      const t = new dodoAPI(configuration);
      await t.getById(id);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });

  describe('getList', () => {
    test('should get request config copy', async () => {
      const options = {};
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.getList(options);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const options = {};
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'get', url: `/` };

      const t = new dodoAPI(configuration);
      await t.getList(options);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });

  describe('delete', () => {
    test('should get request config copy', async () => {
      const id = '123';
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.delete(id);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const id = '123';
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'delete', url: `/${id}` };

      const t = new dodoAPI(configuration);
      await t.delete(id);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });

  describe('func', () => {
    test('should get request config copy', async () => {
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };
      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const t = new dodoAPI(configuration);
      await t.add(data);

      expect(mockedGetRequestConfigCopy).toHaveBeenCalledWith(t.baseConfig);
    });

    test('should call send request with proper configuration', async () => {
      const data = { foo: 'bar' };
      const baseConfigCopy: any = { baseUrl: 'baseUrl' };

      mockedGetRequestConfigCopy.mockReturnValue(baseConfigCopy);

      const updatedBaseConfig = { ...baseConfigCopy, method: 'post', data: data };

      const t = new dodoAPI(configuration);
      await t.add(data);

      expect(sendRequest).toHaveBeenCalledWith(updatedBaseConfig);
    });
  });
});
