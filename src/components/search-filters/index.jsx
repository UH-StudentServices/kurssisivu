// @flow

import React from 'react';
import SelectMultiple from 'components/select-multiple';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import { updateYear, updateSemesters, updateLanguages } from 'state/filters';
import { fetchCourses } from 'state/courses';
import type { Translations } from 'flow/types';

type Props = {
    translations: Translations,
    year: number,
    semesters: string[],
    languages: string[],
    onYearChange: (number) => void,
    onSemestersChange: (string[]) => void,
    onLanguagesChange: (string[]) => void,
    onApplyFilters: () => void,
};

class SearchFilters extends React.Component {
    props: Props

    static defaultProps = {}

    onYearChange(e) {
        this.props.onYearChange(+e.target.value);
    }

    renderYearFilter() {
        return (
            <div className="search-filters__filter form-group">
                <input type="number" id="search-filters-year" value={this.props.year} onChange={this.onYearChange.bind(this)} placeholder={this.props.translations.t('year')} className="form-control search-filters__year-input" />
                <div className="text-muted search-filters__label">{this.props.translations.t('year')}</div>
            </div>
        );
    }

    semesterIsActive(semester: string): boolean {
        return this.props.semesters.indexOf(semester) >= 0;
    }

    onChooseSemester(semester: string) {
        const newSemesters = this.semesterIsActive(semester)
            ? [...[], ...this.props.semesters].filter(s => s !== semester)
            : [...[], ...this.props.semesters, semester];
        
        console.log(newSemesters);

        this.props.onSemestersChange(newSemesters);
    }

    renderSemesterFilter() {
        const options = ['spring', 'autumn', 'summer'].map(value => ({ value, label: this.props.translations.t(value) }));

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

                <div className="text-muted search-filters__label">{this.props.translations.t('semester')}</div>
            </div>
        );
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
                    label={this.props.translations.t('language')}
                    onChange={this.props.onLanguagesChange}
                />
                <div className="text-muted search-filters__label">{this.props.translations.t('language')}</div>
            </div>
        );
    }

    filtersAreValid(): boolean {
        return this.props.semesters.length > 0 && !!this.props.year;
    }

    renderButton() {
        return (
            <div className="search-filters__filter">
                <button disabled={!this.filtersAreValid()} className="btn btn-primary" onClick={this.props.onApplyFilters}>
                    {this.props.translations.t('findCourses')}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="search-filters">
                {this.renderSemesterFilter()}
                {this.renderYearFilter()}
                {this.renderLanguageFilter()}
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    year: state.filters.year,
    semesters: state.filters.semesters,
    languages: state.filters.languages,
});

const mapDispatchToProps = (dispatch: any) => ({
    onYearChange: year => { dispatch(updateYear(year)) },
    onSemestersChange: semesters => { dispatch(updateSemesters(semesters)) },
    onLanguagesChange: languages => { dispatch(updateLanguages(languages)) },
    onApplyFilters: () => { dispatch(fetchCourses()) },
});

const TranslatedSearchFilters = connectTranslations()(SearchFilters);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslatedSearchFilters);