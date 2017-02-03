// @flow

import Polyglot from 'node-polyglot';

export type Course = {
    courseId: string,
    creditPoints: number,
    endDate: Date,
    languages: ({ langcode: string })[],
    learningOpportunityId: string,
    learningOpportunityTypeCode: string,
    realisationName: ({ langcode: string, text: string })[],
    realisationTypeCode: string,
    startDate: Date,
    period: ?string,
};

export type Translations = {
    t: (string, params?: Object) => string
};