import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import browserEnv from 'browser-env';

browserEnv();

import { createTranslatorMock } from 'utils/test-utils';
import { CourseApp } from '../index';
import store from 'state/store';

test('Calls onFetchCourses when mounted', t => {
    const onFetchCoursesSpy = sinon.spy();

    const props = {
        onFetchCourses: onFetchCoursesSpy,
        learningOpportunities: [],
        loadingCourses: true,
        translations: createTranslatorMock(),
    };

    const wrapper = mount(
        <Provider store={store}>
            <CourseApp {...props} />
        </Provider>
    );

    t.true(onFetchCoursesSpy.calledOnce);
});

test.only('Renders learning opportunities correctly', t => {
    const props = {
        onFetchCourses: () => {},
        learningOpportunities: [],
        loadingCourses: true,
        translations: createTranslatorMock(),
    };

    const wrapper = shallow(<CourseApp {...props} />);

    t.is(wrapper.find('.course-app__loading-courses').length, 1);
    t.is(wrapper.find('.course-app__learning-opportunities').length, 0);

    wrapper.setProps(Object.assign({}, props, { loadingCourses: false }));

    t.is(wrapper.find('.course-app__loading-courses').length, 0);
    t.is(wrapper.find('.course-app__learning-opportunities').length, 1);
});