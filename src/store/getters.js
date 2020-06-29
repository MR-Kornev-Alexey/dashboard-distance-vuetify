export default {
  IS_SEARCH_DATA: state => state.isSearchData,
  IS_TYPE_DATA: state => state.isTypeData,
  IS_COMPARE_DATA: state => state.isCompareData,
  PAGE_NUMBER: state => state.pageNumber,
  ERROR_MESSAGE: state => state.error_message,
  DISTANCES: state => state.distances,
  NUMBER: state => state.number,
  //flags of sorting
  IS_SORTING_CITY: state => state.isSortingCity,
  IS_SORTING_NUMBER: state => state.isSortingNumber,
  IS_SORTING_DISTANCE: state => state.isSortingDistance,
  //flag of filtering
  IS_FILTERING_CITY: state => state.isFilteringCity,
  IS_FILTERING_NUMBER: state => state.isFilteringNumber,
  IS_FILTERING_DISTANCE: state => state.isFilteringDistance,
  GET_ERROR: state => state.error
};
