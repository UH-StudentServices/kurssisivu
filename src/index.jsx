// @flow

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';

import CourseApp from 'components/course-app';
import store from 'state/store';
import { load } from 'utils/dependency-loader';

load()
    .then(() => {
        render(
            <Provider store={store}>
                <CourseApp />
            </Provider>,
            document.getElementById('root'),
        );
    });