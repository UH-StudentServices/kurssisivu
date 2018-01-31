// @flow

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';

import CourseApp from 'components/course-app';
import store from 'state/store';
import { updateOrganization } from 'state/filters';
import { load } from 'utils/dependency-loader';

function getRoot(): any {
    return document.getElementById('course-app-root');
}

function getOrganization(): string | null {
    const root = getRoot();

    return root && root.getAttribute('data-organization')
        ? root.getAttribute('data-organization')
        : null;
}

function initializeOrganization(): void {
    const organization = getOrganization();
    if (organization) {
        store.dispatch(updateOrganization(organization));
    }
}

function initializeApp(): void {
    initializeOrganization();
    load()
        .then(() => {
            render(
                <Provider store={store}>
                    <CourseApp />
                </Provider>,
                getRoot(),
            );
        });
}

initializeApp();

export const CoursesApp = props => {
    store.dispatch(updateOrganization(props.dataOrganization));
    return (<div id="course-app-root" />)
};
