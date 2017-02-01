// @flow

export const UPDATE_YEAR = 'FILTERS_UPDATE_YEAR';
export const UPDATE_SEMESTERS = 'FILTERS_UPDATE_SEMESTERS';
export const UPDATE_LANGUAGES = 'FILTERS_UPDATE_LANGUAGES';

export function updateYear(year: number): { type: string, year: number } {
    return {
        type: UPDATE_YEAR,
        year,
    };
}

export function updateSemesters(semesters: string[]): { type: string, semesters: string[] } {
    return {
        type: UPDATE_SEMESTERS,
        semesters,
    };
}

export function updateLanguages(languages: string[]): { type: string, languages: string[] } {
    return {
        type: UPDATE_LANGUAGES,
        languages,
    };
}