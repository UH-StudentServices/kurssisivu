// @flow

export const UPDATE_YEAR = 'FILTERS_UPDATE_YEAR';
export const UPDATE_SEMESTER = 'FILTERS_UPDATE_SEMESTER';
export const UPDATE_LANGUAGES = 'FILTERS_UPDATE_LANGUAGES';
export const UPDATE_PAGINATOR_YEAR = 'FILTERS_UPDATE_PAGINATOR_YEAR';

export function updateYear(year: number): { type: string, year: number } {
    return {
        type: UPDATE_YEAR,
        year,
    };
}

export function updatePaginatorYear(paginatorYear: number): { type: string, paginatorYear: number } {
    return {
        type: UPDATE_PAGINATOR_YEAR,
        paginatorYear,
    };
}

export function updateSemester(semester: string): { type: string, semester: string } {
    return {
        type: UPDATE_SEMESTER,
        semester,
    };
}

export function updateLanguages(languages: string[]): { type: string, languages: string[] } {
    return {
        type: UPDATE_LANGUAGES,
        languages,
    };
}