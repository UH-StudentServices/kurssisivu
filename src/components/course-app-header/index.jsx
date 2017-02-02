// @flow

import React from 'react';

import LanguageSelector from 'components/language-selector';
import SearchFilters from 'components/search-filters';

type Props = {};

type State = {
    stuck: boolean,
};

declare var document: {
    body: Object,
    addEventListener: () => {},
    removeEventListener: () => {},
};

const SCROLL_OFFSET = 150;
const SM_BREAK_POINT = 780;

class CourseAppHeader extends React.Component {
    props: Props
    state: State
    filtersNode: any
    onScroll: () => void

    static defaultProps = {}

    constructor() {
        super();

        this.state = {
            stuck: false,
        };

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScroll);

        this.onScroll();
    }

    componentDidUnMount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        if (document.body.offsetWidth <= SM_BREAK_POINT) {
            return;
        }

        const stuck = document.body.scrollTop >= this.filtersNode.offsetTop + this.filtersNode.offsetHeight + SCROLL_OFFSET;
        
        this.setState({
            stuck,
        });
    }

    render() {
        const stuckClass = this.state.stuck
            ? 'course-app-header--stuck'
            : '';

        const containerClass = this.state.stuck
            ? 'container'
            : '';

        return (
            <div className={`course-app-header ${stuckClass}`} ref={node => this.filtersNode = node}>
                <div className={`course-app-header__container ${containerClass}`}>
                    <div className="course-app-header__filters">
                        <SearchFilters />
                    </div>

                    <div className="course-app-header__languages">
                        <LanguageSelector />
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseAppHeader;