import { dodoAPI } from '..';
import { buildRequestConfig } from '../helpers/request-helper';
import Configuration from '../types/configuration';

jest.mock('../helpers/request-helper');
const mockedBuildRequestConfig = <jest.Mock<typeof buildRequestConfig>>buildRequestConfig;

describe('dodoAPI', () => {
  test('should build and set base request config on dodoAPI instantiation', () => {
    const configuration = <Configuration>{
      account: 'account',
      api: 'api',
    };
    const baseConfig: any = { baseUrl: 'baseUrl' };
    mockedBuildRequestConfig.mockReturnValue(baseConfig);

    const t = new dodoAPI(configuration);

    expect(mockedBuildRequestConfig).toHaveBeenCalledWith(configuration);
    expect(t.baseConfig).toBe(baseConfig);
  });
});
