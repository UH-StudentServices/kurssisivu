// @flow

import React from 'react';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import type { Course as CourseType } from 'flow/types';
import CourseGroup from 'components/course-group';
import CourseAppHeader from 'components/course-app-header';
import { fetchCourses } from 'state/courses';
import { selectLearningOpportunies } from 'selectors/courses';

type Props = {
    onFetchCourses: () => void,
    learningOpportunies: ({ learningOpportunityId: string, courses: CourseType[] })[],
    loadingCourses: boolean,
    translations: Object,
};

export class CourseApp extends React.Component {
    props: Props

    componentDidMount() {
        this.props.onFetchCourses();
    }

    renderCourseGroups() {
        return this.props.learningOpportunies.map(({ learningOpportunityId, courses }) => {
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

    renderLoading() {
        return (
            <div className="text-center text-muted">
                {this.props.translations.loading}...
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
    learningOpportunies: selectLearningOpportunies(state),
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