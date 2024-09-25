import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        isAuthentication: false,
        loading: false,
        Alldata: [],
        getFavour: [],
        updatedata: null,
    },
    reducers: {
        createRequest(state) {
            state.loading = true;
        },
        createSuccess(state, action) {
            state.loading = false;
            state.isAuthentication = true;
            state.data = action.payload; // This should add the new data
        },
        createError(state) {
            state.loading = false;  // Handle error by stopping loading
        },
        dataRequest(state) {
            state.loading = true;
        },
        dataSuccess(state, action) {
            state.loading = false;
            state.isAuthentication = true;
            state.Alldata = action.payload; // Update Alldata with payload
        },
        dataError(state) {
            state.loading = false;
        },
        getSingleRequest(state) {
            state.loading = true;
        },
        getSingleSuccess(state, action) {
            state.loading = false;
            state.isAuthentication = true;
            state.updatedata = action.payload; // This adds the updated data
        },
        getSingleError(state) {
            state.loading = false;
        },
        updateRequest(state) {
            state.loading = true;
        },
        updateSuccess(state, action) {
            state.loading = false;
            state.isAuthentication = true;
            state.updatedata = action.payload;
        },
        updateError(state) {
            state.loading = false;
        },
        favourRequest(state) {
            state.loading = true;
        },
        favourSuccess(state) {
            state.loading = false;
        },
        favourError(state) {
            state.loading = false;
        },
        getfavourRequest(state) {
            state.loading = true;
        },
        getfavourSuccess(state, action) {
            state.loading = false;
            state.getFavour = action.payload || []; // Ensure it's an array
        },
        getfavourError(state) {
            state.loading = false;
        }
    }
});

export const {
    getfavourError,
    getfavourSuccess,
    getfavourRequest,
    favourRequest,
    favourSuccess,
    favourError,
    createRequest,
    createSuccess,
    createError,
    dataRequest,
    dataSuccess,
    dataError,
    updateRequest,
    updateSuccess,
    updateError,
    getSingleRequest,
    getSingleSuccess,
    getSingleError
} = DataSlice.actions;

export default DataSlice.reducer;
