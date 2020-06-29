<template>
    <div class="v-table">
        <v-flex class="d-flex justify-space-between"></v-flex>
        <div class="v-table__header mt-4">
            <p class="dist_time">Дата</p>
            <p :class="{ icon__selected: IS_SORTING_CITY }"
               class="d-flex justify-start text-center dist_city">
                Название
                <v-icon

                        @click="sortingByCity"> mdi-unfold-more-horizontal</v-icon>
            </p>
            <p :class="{ icon__selected: IS_SORTING_NUMBER }"
               class="d-flex justify-start  text-center dist_city">
                Количество
                <v-icon @click="sortingByNumber"> mdi-unfold-more-horizontal</v-icon>
            </p>
            <p :class="{ icon__selected: IS_SORTING_DISTANCE }"
               class="d-flex justify-start  text-center dist_city">
                Расстояние
                <v-icon @click="sortingByDistance"> mdi-unfold-more-horizontal</v-icon>
            </p>
        </div>
        <div class="v-table__body">
            <v-table-row
                    v-for="row in DISTANCES"
                    :key="row.id"
                    v-bind:row_data="row"
            />
        </div>
        <div class="v-table__pagination">
            <div
                    class="page"
                    v-for="page in pages"
                    :key="page"
                    @click="pageClick(page)"
                    :class="{ page__selected: page === pageNumber }"
            >
                {{ page }}
            </div>
        </div>
    </div>
</template>

<script>
    import vTableRow from "./v-table-row";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "v-table-distance",
        components: {
            vTableRow
        },
        props: {
            user_data: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                distPerPage: 10,
                pageNumber: 1,
                sortingType: ""
            };
        },
        computed: {
            ...mapGetters([
                "DISTANCES",
                "NUMBER",
                "IS_SORTING_CITY",
                "IS_SORTING_NUMBER",
                "IS_SORTING_DISTANCE",
                "IS_FILTERING_CITY",
                "IS_FILTERING_NUMBER",
                "IS_FILTERING_DISTANCE",
                "PAGE_NUMBER",
                "IS_SEARCH_DATA",
                "IS_TYPE_DATA",
                "IS_COMPARE_DATA"
            ]),
            pages() {
                let num = Math.ceil(parseInt(this.NUMBER) / 10);
                return num > 0 ? num : 1;
            }
        },
        methods: {
            ...mapActions([
                "GET_DISTANCES_FROM_API",
                "SORTING_FROM_API",
                "GET_DATA_CITY_FROM_API",
                "GET_DATA_NUMBER_FROM_API",
                "GET_DATA_DISTANCE_FROM_API"
            ]),
            sortingByDistance() {
                if (this.IS_FILTERING_CITY === true) {
                    this.GET_DATA_CITY_FROM_API({
                        isFilteringCity: this.IS_FILTERING_CITY,
                        isSortingNumber: false,
                        isSortingCity: false,
                        isSortingDistance: true,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: 'distance',
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else if (this.IS_FILTERING_NUMBER) {
                      this.GET_DATA_NUMBER_FROM_API({
                        isFilteringNumber: this.IS_FILTERING_NUMBER,
                        isSortingCity: false,
                        isSortingNumber: false,
                        isSortingDistance: true,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }else if (this.IS_FILTERING_DISTANCE) {
                     this.GET_DATA_DISTANCE_FROM_API({
                        isFilteringDistance: this.IS_FILTERING_DISTANCE,
                        isSortingCity: false,
                        isSortingNumber: false,
                        isSortingDistance: true,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }

            },
            sortingByNumber() {
                if (this.IS_FILTERING_CITY === true) {
                    this.GET_DATA_CITY_FROM_API({
                        isFilteringCity: this.IS_FILTERING_CITY,
                        isSortingNumber: true,
                        isSortingCity: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: 'number',
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else if (this.IS_FILTERING_NUMBER) {
                   this.GET_DATA_NUMBER_FROM_API({
                        isFilteringNumber: this.IS_FILTERING_NUMBER,
                        isSortingCity: false,
                        isSortingNumber: true,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }
                else if (this.IS_FILTERING_DISTANCE) {
                   this.GET_DATA_DISTANCE_FROM_API({
                        isFilteringDistance: this.IS_FILTERING_DISTANCE,
                        isSortingCity: false,
                        isSortingNumber: true,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }

            },
            sortingByCity() {
                if (this.IS_FILTERING_CITY) {
                   this.GET_DATA_CITY_FROM_API({
                        isFilteringCity: this.IS_FILTERING_CITY,
                        isSortingCity: true,
                        isSortingNumber: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else if (this.IS_FILTERING_NUMBER) {
                   this.GET_DATA_NUMBER_FROM_API({
                        isFilteringNumber: this.IS_FILTERING_NUMBER,
                        isSortingCity: true,
                        isSortingNumber: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else if (this.IS_FILTERING_DISTANCE) {
                    this.GET_DATA_DISTANCE_FROM_API({
                        isFilteringDistance: this.IS_FILTERING_DISTANCE,
                        isSortingCity: true,
                        isSortingNumber: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else {
                    this.GET_DATA_CITY_FROM_API({
                        isFilteringCity: this.IS_FILTERING_CITY,
                        isSortingCity: true,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: 'city',
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });
                }

            },
            pageClick(page) {
                this.pageNumber = page;
                if (this.IS_FILTERING_CITY) {
                    if (this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_CITY_FROM_API({
                            isFilteringCity: this.IS_FILTERING_CITY,
                            isSortingCity: true,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });
                    } else if (!this.IS_SORTING_CITY && this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_CITY_FROM_API({
                            isFilteringCity: this.IS_FILTERING_CITY,
                            isSortingCity: false,
                            isSortingNumber: true,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    } else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_CITY_FROM_API({
                            isFilteringCity: this.IS_FILTERING_CITY,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: true,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_CITY_FROM_API({
                            isFilteringCity: this.IS_FILTERING_CITY,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }

                } else if (this.IS_FILTERING_NUMBER) {
                    if (this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_NUMBER_FROM_API({
                            isFilteringNumber: this.IS_FILTERING_NUMBER,
                            isSortingCity: true,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });
                    } else if (!this.IS_SORTING_CITY && this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_NUMBER_FROM_API({
                            isFilteringNumber: this.IS_FILTERING_NUMBER,
                            isSortingCity: false,
                            isSortingNumber: true,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    } else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_NUMBER_FROM_API({
                            isFilteringNumber: this.IS_FILTERING_NUMBER,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: true,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_NUMBER_FROM_API({
                            isFilteringNumber: this.IS_FILTERING_NUMBER,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }

                }
                else if (this.IS_FILTERING_DISTANCE) {
                    if (this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_DISTANCE_FROM_API({
                            isFilteringDistance: this.IS_FILTERING_DISTANCE,
                            isSortingCity: true,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });
                    } else if (!this.IS_SORTING_CITY && this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_DISTANCE_FROM_API({
                            isFilteringDistance: this.IS_FILTERING_DISTANCE,
                            isSortingCity: false,
                            isSortingNumber: true,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    } else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_DISTANCE_FROM_API({
                            isFilteringDistance: this.IS_FILTERING_DISTANCE,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: true,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }else if (!this.IS_SORTING_CITY && !this.IS_SORTING_NUMBER && !this.IS_SORTING_DISTANCE) {
                        this.GET_DATA_DISTANCE_FROM_API({
                            isFilteringDistance: this.IS_FILTERING_DISTANCE,
                            isSortingCity: false,
                            isSortingNumber: false,
                            isSortingDistance: false,
                            searchData: this.IS_SEARCH_DATA,
                            typeData: this.IS_TYPE_DATA,
                            compareData: this.IS_COMPARE_DATA,
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                            .then(resp => {
                                if (resp.data) {
                                    // console.log('data arrived')
                                }
                            })
                            .catch(error => {
                                return error;
                            });


                    }

                } else if (this.IS_SORTING_CITY) {
                    this.GET_DATA_CITY_FROM_API({
                        isFilteringCity: false,
                        isSortingCity: true,
                        isSortingNumber: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }else if (this.IS_SORTING_NUMBER) {
                    this.GET_DATA_NUMBER_FROM_API({
                        isFilteringNumber: false,
                        isSortingCity: false,
                        isSortingNumber: true,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else if (this.IS_SORTING_DISTANCE) {
                    this.GET_DATA_DISTANCE_FROM_API({
                        isFilteringDistance: false,
                        isSortingCity: false,
                        isSortingNumber: false,
                        isSortingDistance: false,
                        searchData: this.IS_SEARCH_DATA,
                        typeData: this.IS_TYPE_DATA,
                        compareData: this.IS_COMPARE_DATA,
                        pageNumber: this.pageNumber,
                        distPerPage: 10
                    })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                } else  {
                       this.GET_DISTANCES_FROM_API({
                            pageNumber: this.pageNumber,
                            distPerPage: 10
                        })
                        .then(resp => {
                            if (resp.data) {
                                // console.log('data arrived')
                            }
                        })
                        .catch(error => {
                            return error;
                        });

                }
            }

        },
        mounted() {
            this.GET_DISTANCES_FROM_API({
                pageNumber: this.pageNumber,
                distPerPage: 10
            })
                .then(resp => {
                    if (resp.data) {
                        return resp.data;
                    }
                })
                .catch(error => {
                    return error;
                });
        }
    };
</script>

<style lang="scss">
    .icon__selected{
        color: darkred;
        text-transform: uppercase;
        font-weight: 500;
    }
    .search {
        padding: 0;
        margin: 0;
        width: 300px;
    }

    .v-table {
        max-width: 1100px;
        margin: 0 auto;
    }

    .v-table__header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #aeaeae;
    }

    .v-table__header p {
        display: flex;
        align-items: center;
        text-align: left;
        cursor: pointer;
    }

    .dist_time {
        width: 240px;
    }

    .dist_city {
        width: 160px;
        text-align: center;
    }

    .v-table__pagination {
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .page {
        padding-top: 6px;
        width: 36px;
        height: 36px;
        border: 1px solid #aeaeae;
        cursor: pointer;
        text-align: center;
    }

    .page:hover {
        background: #222c56;
        color: white;
    }

    .page__selected {
        background: #222c56;
        color: white;
    }
</style>
