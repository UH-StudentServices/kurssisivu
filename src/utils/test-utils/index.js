export function createCourse(params) {
    const defaults = {
        learningOpportunityId: '1',
        courseId: '1',
        realisationTypeCode: '1',
        startDate: new Date(2017, 9, 7),
        endDate: new Date(2017, 9, 14),
        period: '1',
        realisationName: [{ langcode: 'fi', text: 'My course' }, { langcode: 'sv', text: 'Min Kurs' }],
        languages: [{ langcode: 'fi' }, { langcode: 'sv' }]
    };

    return Object.assign({}, defaults, params);
}

export function createTranslatorMock() {
    return {
      t: (key) => `[translation for ${key}]`,
    };
}