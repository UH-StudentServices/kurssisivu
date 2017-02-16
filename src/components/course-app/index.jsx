// @flow

import React from 'react';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import type { Course as CourseType, Translations } from 'flow/types';
import CourseGroup from 'components/course-group';
import CourseAppHeader from 'components/course-app-header';
import { fetchCourses } from 'state/courses';
import { selectLearningOpportunies } from 'selectors/courses';

type Props = {
    onFetchCourses: () => void,
    learningOpportunities: ({ learningOpportunityId: string, courses: CourseType[] })[],
    loadingCourses: boolean,
    translations: Translations,
};

export class CourseApp extends React.Component {
    props: Props

    componentDidMount() {
        this.props.onFetchCourses();
    }

    renderCourseGroupList() {
        return this.props.learningOpportunities.map(({ learningOpportunityId, courses }) => {
            return (
                <div className="course-app__learning-opportunity-type" key={learningOpportunityId}>
                    <CourseGroup 
                        courses={courses} 
                        learningOpportunityId={learningOpportunityId}  
                    />
                </div>
            );
        });
    }

    renderCourseGroups() {
        return (
            <div className="course-app__learning-opportunities">
                {this.renderCourseGroupList()}
            </div>
        );
    }

    renderLoading() {
        return (
            <div className="text-center text-muted course-app__loading-courses">
                {this.props.translations.t('loading')}...
            </div>
        );
    }

    render() {
        return (
            <div className="course-app container">
                <CourseAppHeader />

                {this.props.loadingCourses && this.renderLoading()}
                {!this.props.loadingCourses && this.renderCourseGroups()}
            </div>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    learningOpportunities: selectLearningOpportunies(state),
    loadingCourses: state.courses.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCourses: () => { dispatch(fetchCourses()) },
});

const TranslatedCourseApp = connectTranslations()(CourseApp);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslatedCourseApp);