import test from 'ava';
import sinon from 'sinon';

import { _api, getCourses } from '../index';
import { toCourse, makeFilter } from '../utils';

function createCourse({ languages, realisationTypeCode, learningOpportunityId } = {}) {
  return {
    course_id: '1', 
    languages: languages || [{ langcode: 'fi' }], 
    start_date: new Date().toString(), 
    end_date: new Date().toString(), 
    credit_points: 5, 
    learningopportunity_id: learningOpportunityId || '1', 
    realisation_name: [{ langcode: 'fi', text: 'Course' }], 
    realisation_type_code: realisationTypeCode || '1',
    learningopportunity_type_code: '1',
  };
}

test.beforeEach(t => {
  t.context.sandbox = sinon.sandbox.create();
});

test.afterEach(t => {
  t.context.sandbox.restore();
});

test.serial.cb('getCourses function calls correct API path', t => {
  const getStub = t.context.sandbox.stub().returns(Promise.resolve({ data: [] }));
  const clientStub = t.context.sandbox.stub(_api, 'getClient').returns({ get: getStub });

  getCourses({ languages: ['fi'], semester: 'spring', year: 2016, organization: 'HY' })
    .then(() => {
      t.true(getStub.calledOnce);
      t.true(getStub.calledWith('/organizations/HY/courses_list.json?semester=spring&year=2016'));
      
      t.end();
    })
    .catch(err => {
      t.fail();
      t.end();
    });  
});

test('makeFilter function filters out exams', t => {
  const courses = [createCourse(), createCourse({ realisationTypeCode: '8' })];

  const filteredCourses = courses.map(toCourse).filter(makeFilter())
  
  t.is(filteredCourses.length, 1);
  t.is(filteredCourses[0].realisationTypeCode, '1');
});

test('makeFilter function filters courses by languages correctly', t => {
  const courses = [createCourse(), createCourse({ languages: [{ langcode: 'sv' }] })];

  const filteredCourses = courses.map(toCourse).filter(makeFilter({ languages: ['sv'] }))
  
  t.is(filteredCourses.length, 1);
  t.is(filteredCourses[0].languages[0].langcode, 'sv');
});

test('toCourse function sets correct learning opportunity type code', t => {
  const rawCourseSeminar = createCourse({
    realisationTypeCode: '10'
  });

  const rawCourseLaboratoryNotAdvanced = createCourse({
    realisationTypeCode: '22'
  });

  t.is(toCourse(rawCourseSeminar).learningOpportunityTypeCode, '_1');
  t.is(toCourse(rawCourseLaboratoryNotAdvanced).learningOpportunityTypeCode, '_2');
});