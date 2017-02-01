// @flow

import React from 'react';
import { chunk } from 'lodash';
import { connect } from 'react-redux';

import Course from 'components/course';
import type { Course as CourseType } from 'flow/types';
import connectTranslations from 'components/connect-translations';

type Props = {
    courses: CourseType[],
    columns: number,
    learningOpportunityId: string,
    translations: Object,
};

class CourseGroup extends React.Component {
    props: Props

    static defaultProps = {
        columns: 2,
    }

    renderList() {
        const chunked = chunk(this.props.courses, this.props.columns);

        return chunked
            .map(chunk => this.renderRow(chunk));
    }

    renderRow(items: CourseType[]) {
        const colNumber = 12 / this.props.columns;
        const rowKey = items.map(item => `${item.learningOpportunityId}_${item.courseId}`).join(',');

        return (
            <div className="row" key={rowKey}>
                {items.map(item => {
                    return (
                        <div className={`col-md-${colNumber}`} key={`${item.learningOpportunityId}_${item.courseId}`}>
                            <Course course={item} />
                        </div>
                    );
                })}
            </div>
        );
    }

    getLearningOpportunityText(): string {
        return this.props.translations.learningOpportunityTypeCodes[`c${this.props.learningOpportunityId}`];
    }

    render() {
        return (
            <div className="course-group">
                <h2 className="course-group__title">{this.getLearningOpportunityText()}</h2>
                {this.renderList()}
            </div>
        );
    }
}

const TranslatedCourseGroup = connectTranslations()(CourseGroup);

export default TranslatedCourseGroup;