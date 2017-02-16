import test from 'ava';

import { getPeriod, getSemesterByDate } from '../index';

test('getPeriod returns correct period', t => {
  t.is(getPeriod(new Date(2016, 4, 20)), '1');
  t.is(getPeriod(new Date(2017, 10, 15)), '2');
  t.is(getPeriod(new Date(2015, 1, 25)), '3');
  t.is(getPeriod(new Date(2017, 4, 4)), '4');
});

test('getSemesterByDate returns correct semester', t => {
  t.is(getSemesterByDate(new Date(2016, 3, 20)), 'spring');
  t.is(getSemesterByDate(new Date(2017, 9, 25)), 'autumn');
  t.is(getSemesterByDate(new Date(2015, 4, 16)), 'summer');
});