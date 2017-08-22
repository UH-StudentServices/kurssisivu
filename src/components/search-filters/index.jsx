// @flow

import React from 'react';
import SelectMultiple from 'components/select-multiple';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import { updateYear, updatePaginatorYear, updateSemester, updateLanguages } from 'state/filters';
import { fetchCourses } from 'state/courses';
import type { Translations } from 'flow/types';

type Props = {
    translations: Translations,
    year: number,
    paginatorYear: number,
    semester: string,
    languages: string[],
    onYearChange: (number) => void,
    onPaginatorYearChange: (number) => void,
    onSemesterChange: (string) => void,
    onLanguagesChange: (string[]) => void,
    onApplyFilters: () => void,
};

class SearchFilters extends React.Component {
    props: Props

    static defaultProps = {}

    getYear(semester: string): number {
        return semester === 'autumn'
            ? this.props.paginatorYear - 1
            : this.props.paginatorYear;
    }

    onChooseSemester(semester: string) {
        this.props.onSemesterChange(semester);
        this.props.onYearChange(this.getYear(semester));
       
       this.props.onApplyFilters();
    }

    semesterIsActive(targetSemester: string): boolean {
        const { semester, year, paginatorYear } = this.props;

        const isChosenSemester = targetSemester === semester;
        const isInTimeFrame = (['spring', 'summer'].includes(targetSemester) && year === paginatorYear) || (targetSemester === 'autumn' && year === paginatorYear - 1);

        return isChosenSemester && isInTimeFrame;
    }

    onNextYear() {
        this.props.onPaginatorYearChange(this.props.paginatorYear + 1);
    }

    onPreviousYear() {
        this.props.onPaginatorYearChange(this.props.paginatorYear - 1);
    }

    renderSemesterFilter() {
        const options = ['autumn', 'spring', 'summer'].map(value => ({ value, label: this.props.translations.t(value) }));

        return (
            <div className="search-filters__filter">
                <ButtonGroup>
                    {options.map(({ value, label }) => (
                        <Button 
                            active={this.semesterIsActive(value)}
                            key={value} 
                            onClick={() => { this.onChooseSemester(value) }}
                        >
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        );
    }

    onLanguagesChange(languages: string[]) {
        this.props.onLanguagesChange(languages);

        this.props.onApplyFilters();
    }

    renderLanguageFilter() {
        const options = [
            { name: 'finnish' , key: 'fi' }, 
            { name: 'swedish', key: 'sv', },
            { name: 'english', key: 'en' },
        ].map(({ name, key }) => ({ value: key, label: this.props.translations.t(name) }));

        return (
            <div className="search-filters__filter">
                <SelectMultiple
                    options={options}
                    values={this.props.languages}
                    label={this.props.translations.t('teachingLanguage')}
                    onChange={this.onLanguagesChange.bind(this)}
                />
                <div className="text-muted search-filters__label">{this.props.translations.t('teachingLanguage')}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="search-filters">
                {this.renderSemesterFilter()}
                {this.renderLanguageFilter()}
            </div>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    year: state.filters.year,
    semester: state.filters.semester,
    languages: state.filters.languages,
    paginatorYear: state.filters.paginatorYear,
});

const mapDispatchToProps = (dispatch: any) => ({
    onYearChange: year => { dispatch(updateYear(year)) },
    onPaginatorYearChange: year => { dispatch(updatePaginatorYear(year)) },
    onSemesterChange: semester => { dispatch(updateSemester(semester)) },
    onLanguagesChange: languages => { dispatch(updateLanguages(languages)) },
    onApplyFilters: () => { dispatch(fetchCourses()) },
});

const TranslatedSearchFilters = connectTranslations()(SearchFilters);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslatedSearchFilters);