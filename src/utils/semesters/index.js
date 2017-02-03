// @flow

import moment from 'moment';

function withinDates(date: Date, dates: Date[]): boolean {
    const [start, end] = dates;

    if(+date >= +start && +date <= +end) {
        return true;
    } else {
        return false;
    }
}

export function getPeriod(date: Date): ?string {
    const year = moment(date).get('years');

    const firstPeriodRange = [
        new Date(year, 4, 9),
        new Date(year, 9, 23),
    ];

    const secondPeriodRange = [
        new Date(year, 9, 31),
        new Date(year, 11, 18),
    ];

    const thirdPeriodRange = [
        new Date(year, 0, 16),
        new Date(year, 2, 5),
    ];

    const fourthPeriodRange = [
        new Date(year, 2, 13),
        new Date(year, 4, 7),
    ];

    const period = [firstPeriodRange, secondPeriodRange, thirdPeriodRange, fourthPeriodRange]
        .map((range, index) => ({ name: (index + 1).toString(), within: withinDates(date, range) }))
        .find(period => period.within);

    return period 
        ? period.name
        : null;
}

export function getSemester(): string {
    const now = moment().toDate();
    const year = moment().get('years');

    const autumnRange = [
        new Date(year, 8, 5),
        new Date(year, 11, 18),
    ];

    const springRange = [
        new Date(year - 1, 11, 18),
        new Date(year, 4, 7),
    ];

    if (withinDates(now, autumnRange)) {
        return 'autumn'
    } else if (withinDates(now, springRange)) {
        return 'spring';
    } else {
        return 'summer';
    }
}