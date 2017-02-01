// @flow

export const UPDATE_LANGUAGE = 'SETTINGS_UPDATE_LANGUAGE';

export function updateLanguage(language: string): { type: string, language: string } {
    return {
        type: UPDATE_LANGUAGE,
        language,
    };
} 