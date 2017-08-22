// @flow

import { createReducer } from 'redux-create-reducer';
import moment from 'moment';

import { UPDATE_YEAR, UPDATE_PAGINATOR_YEAR, UPDATE_SEMESTER, UPDATE_LANGUAGES, UPDATE_ORGANIZATION } from './actions';
import { getSemester } from 'utils/semesters';

export type State = {
    semester: 'spring' | 'autumn' | 'summer',
    year: number,
    paginatorYear: number,
    languages: Array<string>,
    organization: string,
};

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
    [UPDATE_YEAR](state: State, { year }): State {
        return Object.assign({}, state, { year });
    },
    [UPDATE_PAGINATOR_YEAR](state: State, { paginatorYear }): State {
        return Object.assign({}, state, { paginatorYear });
    },
    [UPDATE_SEMESTER](state: State, { semester }): State {
        return Object.assign({}, state, { semester });
    },
    [UPDATE_LANGUAGES](state: State, { languages }): State {
        return Object.assign({}, state, { languages });
    },
    [UPDATE_ORGANIZATION](state: State, { organization }): State {
        return Object.assign({}, state, { organization })
    },
});