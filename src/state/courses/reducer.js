// @flow

import { createReducer } from 'redux-create-reducer';
import { groupBy, keys } from 'lodash';

import { FETCH_COURSES, FETCH_COURSES_SUCCESS, FETCH_COURSES_ERROR } from './actions';

export type State = {
    loading: boolean,
    error: boolean,
    learningOpportunityOrder: Array<string>,
    coursesByLearningOpportunities: Object,
};

const initialState = {
    loading: false,
    error: false,
    learningOpportunityOrder: [],
    coursesByLearningOpportunities: {}
};

const learningOpportunityOrdering = ['12', '2', '_2', '3', '33', '_1', '4'];

const sortByLearningOpportunities = (a: string, b: string): number => {
    const aIndex = learningOpportunityOrdering.indexOf(a);
    const bIndex = learningOpportunityOrdering.indexOf(b);

    return (aIndex >= 0 ? aIndex : learningOpportunityOrdering.length) - (bIndex >= 0 ? bIndex : learningOpportunityOrdering.length);
};

export default createReducer(initialState, {
    [FETCH_COURSES](state: State, action): State {
        return Object.assign({}, state, { loading: true, error: false });
    },
    [FETCH_COURSES_SUCCESS](state: State, action): State {
        const coursesByLearningOpportunities = groupBy(action.courses, 'learningOpportunityTypeCode');
        const learningOpportunityOrder = keys(coursesByLearningOpportunities)
            .sort(sortByLearningOpportunities);

        return Object.assign({}, state, { 
            loading: false, 
            error: false, 
            learningOpportunityOrder,
            coursesByLearningOpportunities,
        });
    },
    [FETCH_COURSES_ERROR](state: State, action): State {
        return Object.assign({}, state, { loading: false, error: true });
    },
});