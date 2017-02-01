// @flow

import axios from 'axios';

import type { Course } from 'flow/types';

const client = axios.create({
    baseURL: 'https://opetushallinto.cs.helsinki.fi',
}); 

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

    return {
        courseId: course_id.toString(),
        languages,
        startDate: new Date(start_date),
        endDate: new Date(end_date),
        creditPoints: credit_points,
        learningOpportunityId: learningopportunity_id,
        realisationName: realisation_name,
        learningOpportunityTypeCode: learningopportunity_type_code,
        realisationTypeCode: realisation_type_code,
    };
}

const mockCourse = (id: string): Course => { 
    return {
        courseId: id, 
        learningOpportunityId: '1', 
        startDate: new Date(), 
        endDate: new Date(), 
        creditPoints: 2, 
        languages: [{ langcode: 'en' }, { langcode: 'fi' }], 
        realisationTypeCode: '3', 
        learningOpportunityTypeCode: parseInt(id) % 2 === 0 ? '12' : '3',
        realisationName: [{ langcode: 'fi', text: 'Ohjelmoinnin perusteet' }],
    };
}

export function getCourses(): Promise<Course[]> {
    return client.get('/courses_list.json')
        .then(({ data }) => data.map(toCourse));
}