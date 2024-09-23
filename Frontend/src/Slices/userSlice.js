import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthentication: false,
        loading: false,
    },
    reducers: {
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                user: action.payload
            }
        },
        registerError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        LoginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        LoginSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                user: action.payload
            }
        },
        LoginError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        ProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        ProfileSuccess(state, action) {
            return {
                loading: false,
                isAuthentication: true,
                user: action.payload.user
            }
        },
        ProfileError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        ForgotRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        ForgotSuccess(state, action) {
            return {
                loading: false,
            }
        },
        ForgotError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        Logout(state, action) {
            return {
                isAuthentication: false,
                user: null
            }
        },
        resetRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        resetSuccess(state, action) {
            return {
                loading: false,
                user: action.payload
            }
        },
        resetError(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
    }
})

export const {
    ForgotRequest,
    ForgotSuccess,
    ForgotError,
    registerRequest,
    registerSuccess,
    registerError, LoginRequest,
    LoginSuccess, LoginError,
    Logout, ProfileRequest,
    ProfileSuccess,
    resetRequest,
    resetSuccess,
    resetError,
    ProfileError } = UserSlice.actions;

export default UserSlice.reducer;