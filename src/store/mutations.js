export default {
  SET_FILTER_DATA_TO_STORE(state, allData) {
    state.isSearchData = allData.searchData;
    state.isTypeData = allData.typeData;
    state.isCompareData = allData.compareData;
  },
  CLEAR_ERROR_FILTER(state) {
    state.error_message = "";
    state.error = false;
  },
  SET_ERROR_FILTER(state, message) {
    state.error_message = message;
    state.error = true;
  },
  SET_DISTANCES_TO_STATE(state, payload) {
    state.distances = payload;
  },
  SET_NUMBER_DIST_TO_STATE(state, payload) {
    state.number = payload;
  },
  SET_IS_FILTERING_DISTANCE_TO_STATE(state) {
    state.isFilteringNumber = false;
    state.isFilteringCity = false;
    state.isFilteringDistance = true;
  },
  SET_IS_FILTERING_NUMBER_TO_STATE(state) {
    state.isFilteringNumber = true;
    state.isFilteringCity = false;
    state.isFilteringDistance = false;
  },
  SET_IS_FILTERING_CITY_TO_STATE(state) {
    state.isFilteringCity = true;
    state.isFilteringNumber = false;
    state.isFilteringDistance = false;
  },
  SET_IS_SORTING_CITY_TO_STATE(state) {
    state.isSortingCity = true;
    state.isSortingNumber = false;
    state.isSortingDistance = false;
  },
  SET_IS_SORTING_NUMBER_TO_STATE(state) {
    state.isSortingCity = false;
    state.isSortingNumber = true;
    state.isSortingDistance = false;
  },
  SET_IS_SORTING_DIST_TO_STATE(state) {
    state.isSortingCity = false;
    state.isSortingNumber = false;
    state.isSortingDistance = true;
  },
  CLEAR_ALL_FLAGS(state) {
    state.isSortingCity = false;
    state.isSortingNumber = false;
    state.isSortingDistance = false;
  }
};
