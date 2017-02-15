// @flow

import axios from 'axios';
import { makeFilter, toCourse } from './utils';

import type { Course } from 'flow/types';

const client = axios.create({
    baseURL: 'https://opetushallinto.cs.helsinki.fi',
}); 

export const _api = {
    getClient,
};

function getClient() {
    return client;
}

export function getCourses({ languages, semester, year, organization }: { languages?: string[], semester: string, year: number, organization: string }): Promise<Course[]> {
    const query = `semester=${semester}&year=${year}`;

    return _api.getClient().get(`/organizations/${organization}/courses_list.json?${query}`)
        .then(({ data }) => data.map(toCourse))
        .then(courses => courses.filter(makeFilter({ languages: languages || [] })));
}