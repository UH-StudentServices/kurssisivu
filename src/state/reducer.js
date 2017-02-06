// @flow

import { combineReducers } from 'redux';

import courses from './courses';
import settings from './settings';
import translations from './translations';
import filters from './filters';

import type { State as CoursesState } from './courses';
import type { State as SettingsState } from './settings';
import type { State as TranslationsState } from './translations';
import type { State as FiltersState } from './filters';

export type State = {
    courses: CoursesState,
    settings: SettingsState,
    translations: TranslationsState,
    filters: FiltersState,
};

export default combineReducers({
    courses,
    settings,
    translations,
    filters,
});