// @flow

import axios from 'axios';
import { intersection } from 'lodash';

import type { Course } from 'flow/types';
import { getPeriod } from 'utils/semesters';

const client = axios.create({
    baseURL: 'https://opetushallinto.cs.helsinki.fi',
}); 

const SEMINAR_REALISATION = '10';
const LABORATORY_REALISATION = '22';
const ADVANCED_STUDIES_LEARNING_OPPORTUNITY = '3';

export function getClient() {
    return client;
}

function toCourse(rawCourse: Object): Course {
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

function filterExams(course: Course): boolean {
    return course.realisationTypeCode !== '8';
}

function filterByLanguages(languages: string[]): (Course) => boolean {
    return (course: Course) => {
        const courseLanguages = course.languages.map(({ langcode }) => langcode);

        return intersection(courseLanguages, languages).length > 0;
    };
}

export function getCourses({ languages, semester, year }: { languages?: string[], semester: string, year: number }): Promise<Course[]> {
    const filters = [filterExams];
    
    if (languages && languages.length > 0) {
        filters.push(filterByLanguages(languages));
    }

    const query = `semester=${semester}&year=${year}`;

    const mergedFilter = (course: Course): boolean => !filters.map(f => f(course)).some(value => !value);

    return getClient().get(`/courses_list.json?${query}`)
        .then(({ data }) => data.map(toCourse))
        .then(courses => courses.filter(mergedFilter));
}