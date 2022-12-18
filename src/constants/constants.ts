/**
 * Available library constants
 */
const Constants = {
  /**
   * Base URL of dodoAPI
   */
  baseURL: 'https://app.dodoAPI.com',

  /**
   * Get list API search options
   */
  searchOptions: {
    /**
     * The sort column. Default '_id'
     */
    sortBy: 'sort.by',
    /**
     * The sort order. Options asc / desc. Default asc
     */
    sortOrder: 'sort.order',
    /**
     * The requested page number starting from 1. Options [1, 2, ... n]. Default 1
     */
    pagerPage: 'pager.page',
    /**
     * The number of records per request. Max 1. Min 50. Default 25
     */
    pagerSize: 'pager.size',
    /**
     * The search column. If not provided search is performed in all columns
     */
    searchBy: 'search.by',
    /**
     * The search operator. Options like / equal / notequal / in / notin
     */
    searchOperator: 'search.operator',
    /**
     * The search value. If search operator is in or notin values are separated by comma (,)
     */
    searchValues: 'search.values',
  },

  /**
   * Message constants
   */
  messages: {
    /**
     * Response message constants
     */
    response: {
      /**
       * Response error
       */
      error: 'An error occured while processing the request',
    },
    /**
     * Configuration message constants
     */
    configuration: {
      /**
       * Missing account
       */
      missingAccount: 'Configuration > API account was not provided',
      /**
       * Missing API name
       */
      missingApiName: 'Configuration > API name was not provided',
      /**
       * Missing basic auth username
       */
      missingUsername: 'Configuration > Basic auth > Username was not provided',
      /**
       * Missing basic auth password
       */
      missingPassword: 'Configuration > Basic auth > Password was not provided',
      /**
       * Missing key auth key
       */
      missingKey: 'Configuration > Key auth > Key was not provided',
    },
  },
};

export = Constants;
