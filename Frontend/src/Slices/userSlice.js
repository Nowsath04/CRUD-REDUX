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
        Logout(state, action) {
            return {
                isAuthentication: false,
                user: null
            }
        },
    }
})

export const { registerRequest, registerSuccess, registerError, LoginRequest, LoginSuccess, LoginError, Logout, ProfileRequest, ProfileSuccess, ProfileError } = UserSlice.actions;

export default UserSlice.reducer;