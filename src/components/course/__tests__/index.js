import test from 'ava';
import { shallow } from 'enzyme';
import React from 'react';

import { createCourse, createTranslatorMock } from 'utils/test-utils';
import { Course } from '../index';
import Flag from 'components/flag';

test('Course name is rendered correctly', t => {
  const props = {
    language: 'fi',
    course: createCourse(),
    translations: createTranslatorMock(),
  };

  const wrapper = shallow(<Course {...props} />);

  t.true(wrapper.find('.course__header').first().contains('My course'));

  wrapper.setProps(Object.assign({}, props, { language: 'sv' }));

  t.true(wrapper.find('.course__header').first().contains('Min Kurs'));

  wrapper.setProps(Object.assign({}, props, { language: 'en' }));

  t.true(wrapper.find('.course__header').first().contains('My course'));
});

test('Course footer is rendered correctly', t => {
  const props = {
    language: 'fi',
    course: createCourse({
      startDate: new Date(2017, 9, 1),
      endDate: new Date(2017, 11, 14),
    }),
    translations: createTranslatorMock(),
  };

  const wrapper = shallow(<Course {...props} />);

  t.true(wrapper.find('.course__footer').contains('01.10.2017'));
  t.true(wrapper.find('.course__footer').contains('14.12.2017'));
});

test('Course link is rendered corretly', t => {
  const props = {
    language: 'fi',
    course: createCourse(),
    translations: createTranslatorMock(),
  };

  const wrapper = shallow(<Course {...props} />);

  t.is(wrapper.find('.course__link').props().href, 'https://courses.helsinki.fi/fi/1/1');

  wrapper.setProps(Object.assign({}, props, { language: 'sv' }));

   t.is(wrapper.find('.course__link').props().href, 'https://courses.helsinki.fi/sv/1/1');

  wrapper.setProps(Object.assign({}, props, { language: 'en' }));

  t.is(wrapper.find('.course__link').props().href, 'https://courses.helsinki.fi/1/1');
});

test('Course languages are rendered correctly', t => {
  const props = {
    language: 'fi',
    course: createCourse(),
    translations: createTranslatorMock(),
  };

  const wrapper = shallow(<Course {...props} />);

  const flagCodes = wrapper.find(Flag)
    .map(flagNode => flagNode.props().code)
    .sort()

  t.deepEqual(['fi', 'sv'].sort(), flagCodes);
});