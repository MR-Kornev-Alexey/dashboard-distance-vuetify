import axios from "axios";

export default {
    GET_DATA_DISTANCE_FROM_API({commit}, allData) {
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
        commit("CLEAR_ERROR_FILTER")
        if (allData.compareData === "contains") {
            commit(
                "SET_ERROR_FILTER",
                "Для колонки РАССТОЯНИЕ условие СОДЕРЖИТ не работает"
            );
            return false;
        }
        commit("SET_FILTER_DATA_TO_STORE", allData);
        const url = "https://klvr.link/sortindistance";
        return axios.post(url, allData)
            .then(response => {
                if (Number(response.data.count) === 0) {
                    commit("SET_ERROR_FILTER", "По вашему запросу ничего не найдено")
                }
                commit("SET_DISTANCES_TO_STATE", response.data.distances);
                commit("SET_IS_FILTERING_DISTANCE_TO_STATE");
                commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    },

    GET_DATA_NUMBER_FROM_API({commit}, allData) {
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
        commit("CLEAR_ERROR_FILTER")
        if (allData.compareData === "contains") {
            commit(
                "SET_ERROR_FILTER",
                "Для колонки КОЛИЧЕСТВО условие СОДЕРЖИТ не работает"
            );
            return false;
        }
        commit("SET_FILTER_DATA_TO_STORE", allData);
        const url = "https://klvr.link/sortingnumber";
        return axios.post(url, allData)
            .then(response => {
                if (Number(response.data.count) === 0) {
                    commit("SET_ERROR_FILTER", "По вашему запросу ничего не найдено")
                }
                commit("SET_DISTANCES_TO_STATE", response.data.distances);
                commit("SET_IS_FILTERING_NUMBER_TO_STATE");
                commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    },
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
        commit("CLEAR_ERROR_FILTER");
        if (allData.compareData === ">" || allData.compareData === "<") {
            commit(
                "SET_ERROR_FILTER",
                "Для колонки НАЗВАНИЕ  работают только условие СОДЕРЖИТ или РАВНО"
            );
            return false;
        }
        commit("SET_FILTER_DATA_TO_STORE", allData);
        const url = "https://klvr.link/sortingcity";
        return axios.post(url, allData)
            .then(response => {
                if (Number(response.data.count) === 0) {
                    commit("SET_ERROR_FILTER", "По вашему запросу ничего не найдено")
                }
                commit("SET_DISTANCES_TO_STATE", response.data.distances);
                commit("SET_IS_FILTERING_CITY_TO_STATE");
                commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    },
    GET_DISTANCES_FROM_API({commit}, {pageNumber, distPerPage}) {
        const url = "https://klvr.link/getfaker";
        const data = {pageNumber: pageNumber, distPerPage: distPerPage};
        return axios
            .post(url, data)
            .then(response => {
                commit("SET_DISTANCES_TO_STATE", response.data.distances);
                commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }
}
