// @flow

import { createSelector } from 'reselect'

import { selectActiveLanguage } from 'selectors/settings';

export const selectTranslations = (state: Object): Object => state.translations.data;

export const selectActiveTranslations = createSelector(
    selectTranslations,
    selectActiveLanguage,
    (translations: Object, language: string): Object => {
        return translations[language] || translations['fi'];
    },
);