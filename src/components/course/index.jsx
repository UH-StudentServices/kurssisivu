// @flow

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import type { Course as CourseType, Translations } from 'flow/types';
import Flag from 'components/flag';

type Props = {
    course: CourseType,
    language: string,
    translations: Translations,
}

class Course extends React.Component {
    props: Props

    renderLink() {
        const { learningOpportunityId, courseId } = this.props.course;

        const languagePath = ['fi', 'sv'].includes(this.props.language)
            ? `${this.props.language}/`
            : '';

        return (
            <a className="course__link" target="_blank" href={`https://courses.helsinki.fi/${languagePath}${learningOpportunityId}/${courseId}`}>
                {this.getCourseName()}
            </a>
        );
    }

    getRealisationTypeText() {
        return this.props.translations.t(`realizationTypeCodes.c${this.props.course.realisationTypeCode}`);
    }

    formatDate(date: Date): string {
        return moment(date).format('DD.MM.YYYY');
    }

    renderDates() {
        const { startDate, endDate } = this.props.course;

        return (
            <small className="text-muted">{this.formatDate(startDate)} - {this.formatDate(endDate)}</small>
        );
    }

    getCourseName(): string {
        const realisation = this.props.course.realisationName
            .find((name: { langcode: string, text: string }) => {
                return name.langcode === this.props.language
            });

        return realisation
            ? realisation.text
            : this.props.course.realisationName[0].text;
    }

    renderLanguages() {
        return this.props.course.languages.map(({ langcode }: { langcode: string }) => {
            return <Flag code={langcode} className="course__language" key={langcode} squared />
        });
    }

    render() {
        return (
            <div className="course">
                <div className="course__header">
                    {this.renderLink()}
                </div>

                <div className="course__footer">
                    <div className="course__dates">
                        {this.renderDates()}
                    </div>

                    <div className="course__badges">
                        <span className="badge badge-primary">
                            {this.getRealisationTypeText()}
                        </span>
                    </div>

                    <div className="course__language-list">
                        {this.renderLanguages()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    language: state.settings.language,
});

const TranslatedCourse = connectTranslations()(Course);

export default connect(
    mapStateToProps,
)(TranslatedCourse);