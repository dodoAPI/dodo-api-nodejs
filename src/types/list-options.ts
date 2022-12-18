import SearchOperator from './search-operator';
import SortOrder from './sort-order';

type ListOptions = {
  /**
   * The sort column. Default '_id'
   */
  sortBy?: string;
  /**
   * The sort order. Options asc / desc. Default asc
   */
  sortOrder?: SortOrder;
  /**
   * The requested page number starting from 1. Options [1, 2, ... n]. Default 1
   */
  pagerPage?: number;
  /**
   * The number of records per request. Max 1. Min 50. Default 25
   */
  pagerSize?: number;
  /**
   * The search column. If not provided search is performed in all columns
   */
  searchBy?: string;
  /**
   * The search operator. Options like / equal / notequal / in / notin
   */
  searchOperator?: SearchOperator;
  /**
   * The search value. If search operator is in or notin values are separated by comma (,)
   */
  searchValues?: string;
};

export = ListOptions;
