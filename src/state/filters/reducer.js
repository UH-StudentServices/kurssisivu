// @flow

import { createReducer } from 'redux-create-reducer';
import moment from 'moment';

import { UPDATE_YEAR, UPDATE_PAGINATOR_YEAR, UPDATE_SEMESTER, UPDATE_LANGUAGES } from './actions';
import { getSemester } from 'utils/semesters';

function getYear(): number {
    return moment().get('years');
}

const initialState = {
    semester: getSemester(),
    year: getYear(),
    paginatorYear: getYear(),
    languages: [],
};

export default createReducer(initialState, {
    [UPDATE_YEAR](state, { year }) {
        return Object.assign({}, state, { year });
    },
    [UPDATE_PAGINATOR_YEAR](state, { paginatorYear }) {
        return Object.assign({}, state, { paginatorYear });
    },
    [UPDATE_SEMESTER](state, { semester }) {
        return Object.assign({}, state, { semester });
    },
    [UPDATE_LANGUAGES](state, { languages }) {
        return Object.assign({}, state, { languages });
    },
});