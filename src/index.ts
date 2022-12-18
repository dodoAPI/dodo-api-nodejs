import { buildRequestConfig, buildSearchOptions, getRequestConfigCopy, sendRequest } from './helpers/request-helper';
import Configuration = require('./types/configuration');
import ErrorResponse = require('./types/error-response');
import ListOptions = require('./types/list-options');
import PagedResultResponse = require('./types/paged-result-response');

class dodoAPI {
  baseConfig: any;

  constructor(configuration: Configuration) {
    this.baseConfig = buildRequestConfig(configuration);
  }

  add = async (data: any): Promise<any> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `post`;
    config.data = data;

    return await sendRequest<any>(config);
  };

  edit = async (id: string, data: any): Promise<any> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `put`;
    config.url = `/${id}`;
    config.data = data;

    return await sendRequest<any>(config);
  };

  getById = async <T>(id: string): Promise<T | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `get`;
    config.url = `/${id}`;

    return await sendRequest<T>(config);
  };

  getList = async <T>(options?: ListOptions): Promise<PagedResultResponse<T> | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.params = buildSearchOptions(options);
    config.method = `get`;
    config.url = `/`;

    return await sendRequest<PagedResultResponse<T>>(config);
  };

  delete = async (id: string): Promise<any | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `delete`;
    config.url = `/${id}`;

    return await sendRequest<any>(config);
  };

  func = async (data: any): Promise<any> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `post`;
    config.data = data;

    return await sendRequest<any>(config);
  };
}

export = dodoAPI;
