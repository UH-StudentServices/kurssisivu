// @flow

import { createReducer } from 'redux-create-reducer';
import moment from 'moment';

import { UPDATE_YEAR, UPDATE_SEMESTERS, UPDATE_LANGUAGES } from './actions';

function withinDates(date: Date, dates: Date[]): boolean {
    const [start, end] = dates;

    if(+date >= +start && +date < end) {
        return true;
    } else {
        return false;
    }
}

function getSemester(): string {
    const now = moment().toDate();
    const year = moment().get('years');

    const autumnRange = [
        new Date(year, 8, 5),
        new Date(year, 11, 18),
    ];

    const springRange = [
        new Date(year - 1, 11, 18),
        new Date(year, 4, 7),
    ];

    if (withinDates(now, autumnRange)) {
        return 'autumn'
    } else if (withinDates(now, springRange)) {
        return 'spring';
    } else {
        return 'summer';
    }
}

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