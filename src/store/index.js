import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import sidebar from './sidebar';
import appbar from './appbar';

const reducer = combineReducers({
    sidebar,
    appbar,
});

const store = configureStore({
    reducer,
});

export default store;