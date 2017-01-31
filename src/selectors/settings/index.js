// @flow

import { createSelector } from 'reselect'

export const selectActiveLanguage = (state: Object): string => state.settings.language;