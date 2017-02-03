// @flow

import { createReducer } from 'redux-create-reducer';
import moment from 'moment';

import { UPDATE_YEAR, UPDATE_SEMESTERS, UPDATE_LANGUAGES } from './actions';
import { getSemester } from 'utils/semesters';

function getYear(): number {
    return moment().get('years');
}

const initialState = {
    semesters: [getSemester()],
    year: getYear(),
    languages: [],
};

export default createReducer(initialState, {
    [UPDATE_YEAR](state, { year }) {
        return Object.assign({}, state, { year });
    },
    [UPDATE_SEMESTERS](state, { semesters }) {
        return Object.assign({}, state, { semesters });
    },
    [UPDATE_LANGUAGES](state, { languages }) {
        return Object.assign({}, state, { languages });
    },
});