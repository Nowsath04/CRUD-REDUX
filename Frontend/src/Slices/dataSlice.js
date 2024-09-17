import { createSlice } from "@reduxjs/toolkit";


const DataSlice = createSlice({
    name: "data",
    Alldata: [],
    initialState: {
        isAuthentication: false,
        loading: false,
    },
    reducers: {
        createRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                data: action.payload
            }
        },
        createError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        dataRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        dataSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                Alldata: action.payload
            }
        },
        dataError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getSingleRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getSingleSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                updatedata: action.payload
            }
        },
        getSingleError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                updatedata: action.payload
            }
        },
        updateError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
    }
})

export const {
    createRequest,
    createSuccess,
    createError,
    dataRequest,
    dataSuccess, dataError,
    updateRequest,
    updateSuccess,
    updateError,
    getSingleRequest,
    getSingleSuccess,
    getSingleError
} = DataSlice.actions;

export default DataSlice.reducer;