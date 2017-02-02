// @flow

import { createSelector } from 'reselect'

import { selectActiveLanguage } from 'selectors/settings';
import Polyglot from 'node-polyglot';

export const selectTranslations = (state: Object): Object => state.translations.data;

export const selectActiveTranslations = createSelector(
    selectTranslations,
    selectActiveLanguage,
    (translations: Object, language: string): Object => {
        const polyglot = new Polyglot();

        polyglot.extend(translations[language] || translations['fi']);

        return polyglot;
    },
);