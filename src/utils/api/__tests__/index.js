import test from 'ava';
import sinon from 'sinon';

import { _api, getCourses } from '../index';
import { toCourse } from '../utils';

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

test.serial.cb('getCourses function calls correct API path', t => {
  const sandbox = sinon.sandbox.create();

  const getStub = sandbox.stub().returns(Promise.resolve({ data: [] }));
  const clientStub = sandbox.stub(_api, 'getClient').returns({ get: getStub });

  getCourses({ languages: ['fi'], semester: 'spring', year: 2016, organization: 'HY' })
    .then(() => {
      t.true(getStub.calledOnce);
      t.true(getStub.calledWith('/organizations/HY/courses_list.json?semester=spring&year=2016'));
      
      sandbox.restore();
      
      t.end();
    })
    .catch(err => {
      t.fail();
      t.end();
    });  
});

test.serial.cb('getCourses function filters courses correctly', t => {
  const sandbox = sinon.sandbox.create();

  const getStub = sandbox.stub().returns(Promise.resolve({ 
    data: [createCourse(), createCourse({ languages: [{ langcode: 'sv' }] })], 
  }));

  const clientStub = sandbox.stub(_api, 'getClient').returns({ get: getStub });

  getCourses({ languages: ['sv'], semester: 'spring', year: 2016, organization: 'HY' })
    .then(courses => {
      t.is(courses.length, 1);
      t.is(courses[0].languages[0].langcode, 'sv');

      sandbox.restore();

      t.end();
    })
    .catch(err => {
      t.fail();
      t.end();
    });
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
