// @flow

import { createReducer } from 'redux-create-reducer';

import translations from 'utils/translations';

export type State = {
    data: Object,
};

const initialState = {
    data: translations,
};

export default createReducer(initialState, {});