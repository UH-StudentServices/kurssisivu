// @flow

import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import reducer from './reducer';
import * as api from 'utils/api';

const thunkArguments = {
    api,
};

export type ThunkArguments = typeof thunkArguments;

export default createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(thunkArguments)),
);