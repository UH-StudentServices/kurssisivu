// @flow

import { createSelector } from 'reselect'

export const selectCoursesByLearningOpportunities = (state: Object): Object => state.courses.coursesByLearningOpportunities;
export const selectLearningOpportunityOrder = (state: Object): string[] => state.courses.learningOpportunityOrder;

export const selectLearningOpportunies = createSelector(
    selectCoursesByLearningOpportunities,
    selectLearningOpportunityOrder,
    (coursesByLearningOpportunies: Object, learningOpportunityOrder: string[]) => {
        return learningOpportunityOrder.map(opportunity => ({
            learningOpportunityId: opportunity,
            courses: coursesByLearningOpportunies[opportunity],
        }));
    }
)