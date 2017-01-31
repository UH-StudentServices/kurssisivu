// @flow

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
};