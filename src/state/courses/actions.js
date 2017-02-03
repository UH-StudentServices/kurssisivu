// @flow

import type { Course } from 'flow/types';

export const FETCH_COURSES = 'COURSES_FETCH_COURSES';
export const FETCH_COURSES_SUCCESS = 'COURSES_FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_ERROR = 'COURSES_FETCH_COURSES_ERROR';

export function fetchCourses() {
    return (dispatch: () => void, getState: () => Object, { api }: { api: any }) => {
        dispatch(fetchCoursesAction());

        const { filters: { languages, semester, year } } = getState();

        return api.getCourses({ languages, semester, year })
            .then(courses => dispatch(fetchCoursesSuccess(courses)))
            .catch(() => dispatch(fetchCoursesError()));
    };
}

export function fetchCoursesAction(): { type: string } {
    return {
        type: FETCH_COURSES,
    };
}

export function fetchCoursesError(): { type: string } {
    return {
        type: FETCH_COURSES_ERROR,
    };
}

export function fetchCoursesSuccess(courses: Course[]): { type: string, courses: Course[] } {
    return {
        type: FETCH_COURSES_SUCCESS,
        courses,
    };
}