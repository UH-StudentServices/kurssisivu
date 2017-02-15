// @flow

import type { Course } from 'flow/types';
import { getPeriod } from 'utils/semesters';
import { intersection } from 'lodash';

const SEMINAR_REALISATION = '10';
const LABORATORY_REALISATION = '22';
const ADVANCED_STUDIES_LEARNING_OPPORTUNITY = '3';

export function toCourse(rawCourse: Object): Course {
    const { 
        course_id, 
        languages, 
        start_date, 
        end_date, 
        credit_points, 
        learningopportunity_id, 
        realisation_name, 
        realisation_type_code,
        learningopportunity_type_code,
    } = rawCourse;

    let learningOpportunityTypeCode = learningopportunity_type_code.toString();

    if (realisation_type_code.toString() === SEMINAR_REALISATION) {
        learningOpportunityTypeCode = '_1';
    } else if (realisation_type_code.toString() === LABORATORY_REALISATION && learningopportunity_type_code.toString() !== ADVANCED_STUDIES_LEARNING_OPPORTUNITY) {
        learningOpportunityTypeCode = '_2';
    }

    return {
        courseId: course_id.toString(),
        languages,
        startDate: new Date(start_date),
        endDate: new Date(end_date),
        period: getPeriod(new Date(start_date)),
        creditPoints: credit_points,
        learningOpportunityId: learningopportunity_id.toString(),
        realisationName: realisation_name,
        learningOpportunityTypeCode,
        realisationTypeCode: realisation_type_code.toString(),
    };
}

export function filterExams(course: Course): boolean {
    return course.realisationTypeCode !== '8';
}

export function filterByLanguages(languages: string[]): (Course) => boolean {
    return (course: Course) => {
        const courseLanguages = course.languages.map(({ langcode }) => langcode);

        return intersection(courseLanguages, languages).length > 0;
    };
}