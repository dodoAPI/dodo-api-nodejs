import SearchOperator from './search-operator';
import SortOrder from './sort-order';

type ListOptions = {
  sortBy?: string;
  sortOrder?: SortOrder;
  pagerPage?: number;
  pagerSize?: number;
  searchBy?: string;
  searchOperator?: SearchOperator;
  searchValues?: string;
};

export = ListOptions;
