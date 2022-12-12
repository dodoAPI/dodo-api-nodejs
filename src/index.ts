import axios from 'axios';
import { buildRequestConfig, buildSearchOptions, getRequestConfigCopy } from "./helpers/request-helper";
import Configuration = require("./types/configuration");
import ErrorResponse = require("./types/error-response");
import ListOptions = require('./types/list-options');
import PagedResultResponse = require("./types/paged-result-response");

export class dodoAPI {

  baseConfig: any;

  constructor(configuration: Configuration) {
    this.baseConfig = buildRequestConfig(configuration);
  }

  add = async (data: any) => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `post`;
    config.data = data;

    const res = await axios(config);
    return res.data;
  }

  edit = async (id: string, data: any): Promise<any> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `put`;
    config.url = `/${id}`;
    config.data = data;

    const res = await axios(config);
    return res.data;
  }

  getById = async <T>(id: string): Promise<T | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `get`;
    config.url = `/${id}`

    const res = await axios(config);
    return res.data;
  }

  getList = async <T>(options?: ListOptions): Promise<PagedResultResponse<T> | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.params = buildSearchOptions(options);
    config.method = `get`;
    config.url = `/`

    const res = await axios.request(config);
    return res.data;
  }

  delete = async (id: string): Promise<any | ErrorResponse> => {
    const config = getRequestConfigCopy(this.baseConfig);

    config.method = `delete`;
    config.url = `/${id}`

    const res = await axios.request(config);
    return res.data;
  }
}
