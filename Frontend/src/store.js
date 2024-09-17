import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import auth from "./Slices/userSlice";
import dataReducer from "./Slices/dataSlice";

const reducer = combineReducers({
    auth: auth,
    dataReducer: dataReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;
