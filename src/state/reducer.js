// @flow

import { combineReducers } from 'redux';

import courses from './courses';
import settings from './settings';
import translations from './translations';
import filters from './filters';

export default combineReducers({
    courses,
    settings,
    translations,
    filters,
});