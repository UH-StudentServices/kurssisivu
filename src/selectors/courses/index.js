// @flow

import { createSelector } from 'reselect'
import { sortBy } from 'lodash';

import type { Course } from 'flow/types';
import { selectActiveLanguage } from 'selectors/settings';

export const selectCoursesByLearningOpportunities = (state: Object): Object => state.courses.coursesByLearningOpportunities;
export const selectLearningOpportunityOrder = (state: Object): string[] => state.courses.learningOpportunityOrder;

function sortCoursesByName(courses: Array<Course>, language: string): Array<Course> {
    return sortBy(courses, (course: Course) => {
        const realisation = course.realisationName.find(({ langcode }) => langcode == language) || course.realisationName[0];

        return realisation.text;
    });
}

export const selectLearningOpportunies = createSelector(
    selectCoursesByLearningOpportunities,
    selectLearningOpportunityOrder,
    selectActiveLanguage,
    (coursesByLearningOpportunies: Object, learningOpportunityOrder: string[], activeLanguage: string) => {
        return learningOpportunityOrder.map(opportunity => ({
            learningOpportunityId: opportunity,
            courses: sortCoursesByName(coursesByLearningOpportunies[opportunity], activeLanguage),
        }));
    }
);