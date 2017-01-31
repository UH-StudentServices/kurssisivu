// @flow

import { createReducer } from 'redux-create-reducer';

import translations from 'utils/translations';

const initialState = {
    data: translations,
};

export default createReducer(initialState, {});