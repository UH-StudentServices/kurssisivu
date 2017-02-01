// @flow

import { createReducer } from 'redux-create-reducer';

import { getClientLanguage } from 'utils/store';

const availableLanguages = [
    { code: 'fi', name: 'Suomi' }, 
    { code: 'sv', name: 'Svenska' },
    { code: 'en', name: 'English' },
];

const initialState = {
    language: getClientLanguage() || 'fi',
    availableLanguages,
};

export default createReducer(initialState, {});