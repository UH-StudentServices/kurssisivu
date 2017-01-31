// @flow

import { createReducer } from 'redux-create-reducer';
import moment from 'moment';

import { UPDATE_YEAR, UPDATE_SEMESTERS } from './actions';

function getSemester(): string {
    const month = moment().get('months');

    if (month >= 0 && month < 7) {
        return 'spring'
    } else if (month >= 7 && month < 9) {
        return 'summer';
    } else {
        return 'autumn';
    }
}

function getYear(): number {
    return moment().get('years');
}

const initialState = {
    semesters: [getSemester()],
    year: getYear(),
};

export default createReducer(initialState, {
    [UPDATE_YEAR](state, action) {
        return Object.assign({}, state, { year: action.year });
    },
    [UPDATE_SEMESTERS](state, action) {
        return Object.assign({}, state, { semesters: action.semesters });
    },
});