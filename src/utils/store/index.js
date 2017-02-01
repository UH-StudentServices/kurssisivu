// @flow

import * as store from 'store';

export function getClientLanguage(): string {
    return store.get('courseApp.language');
}

export function setClientLanguage(language: string) {
    store.set('courseApp.language', language);
}