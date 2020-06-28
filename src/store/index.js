import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pageNumber: 1,
        error: null,
        error_message: "",
        distances: [],
        number: 0,
        isSortingCity: false,
        isEquallyCity: "",
        isContainsCity: "",
        isFilteringCity: false,
        isFilteringNumber:false,

        isSortingNumber: false,
        isSortingDistance: false,


        isSearchData: "",
        isTypeData: "",
        isCompareData: ""
    },
    mutations: {
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
        SET_IS_FILTERING_NUMBER_TO_STATE(state) {
            state.isFilteringnNumber = true;
        },
        SET_IS_FILTERING_CITY_TO_STATE(state) {
            state.isFilteringCity = true;
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
        CLEAR_ALL_FLAGS (state) {
            state.isSortingCity = false;
            state.isSortingNumber = false;
            state.isSortingDistance = false;
        }
    },
    actions: {
        GET_DATA_CITY_FROM_API({commit}, allData) {
            commit("CLEAR_ALL_FLAGS")
            if (allData.isSortingCity) {
                commit("SET_IS_SORTING_CITY_TO_STATE");
            }
            if (allData.isSortingNumber) {
                commit("SET_IS_SORTING_NUMBER_TO_STATE");
            }
            if (allData.isSortingDistance) {
                commit("SET_IS_SORTING_DIST_TO_STATE");
            }
            // if (allData.isFilteringCity) {
            //     commit("SET_IS_FILTERING_CITY_TO_STATE")
            // }
            commit("CLEAR_ERROR_FILTER");
            if (allData.compareData === ">" || allData.compareData === "<") {
                commit(
                    "SET_ERROR_FILTER",
                    "Для колонки НАЗВАНИЕ  работают только условие СОДЕРЖИТ или РАВНО"
                );
                return false;
            }
            commit("SET_FILTER_DATA_TO_STORE", allData);
            const url = "http://localhost:3000/sortingcity";
            return axios.post(url, allData)
                .then(response => {
                    if (Number(response.data.count) === 0) {
                        commit("SET_ERROR_FILTER", "По вашему запросу ничего не найдено")
                    }
                    commit("SET_DISTANCES_TO_STATE", response.data.distances);
                    // commit("CLEAR_IS_SORTING_ALL_TO_STATE");
                    commit("SET_IS_FILTERING_CITY_TO_STATE");
                    commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
        },
        GET_DISTANCES_FROM_API({commit}, {pageNumber, distPerPage}) {
            const url = "http://localhost:3000/getfaker";
            const data = {pageNumber: pageNumber, distPerPage: distPerPage};
            return axios
                .post(url, data)
                .then(response => {
                    commit("SET_DISTANCES_TO_STATE", response.data.distances);
                    commit("CLEAR_IS_SORTING_ALL_TO_STATE");
                    commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
                    return response;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        }
    },
    getters: {
        IS_SEARCH_DATA: state => state.isSearchData,
        IS_TYPE_DATA: state => state.isTypeData,
        IS_COMPARE_DATA: state => state.isCompareData,
        PAGE_NUMBER: state => state.pageNumber,
        ERROR_MESSAGE: state => state.error_message,
        DISTANCES: state => state.distances,
        NUMBER: state => state.number,
        IS_SORTING_CITY: state => state.isSortingCity,
        IS_SORTING_NUMBER: state => state.isSortingNumber,
        IS_SORTING_DISTANCE: state => state.isSortingDistance,
        IS_FILTERING_CITY: state => state.isFilteringCity,
        IS_FILTERING_NUMBER: state => state.isFilteringNumber,
        GET_ERROR: state => state.error
    }
});
