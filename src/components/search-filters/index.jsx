// @flow

import React from 'react';
import SelectMultiple from 'components/select-multiple';
import { connect } from 'react-redux';

import connectTranslations from 'components/connect-translations';
import { updateYear, updateSemesters, updateLanguages } from 'state/filters';
import { fetchCourses } from 'state/courses';

type Props = {
    translations: Object,
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
                <input type="number" id="search-filters-year" value={this.props.year} onChange={this.onYearChange.bind(this)} placeholder={this.props.translations.year} className="form-control search-filters__year-input" />
                <div className="text-muted search-filters__label">{this.props.translations.year}</div>
            </div>
        );
    }

    renderSemesterFilter() {
        const options = ['spring', 'autumn', 'summer'].map(value => ({ value, label: this.props.translations[value] }));

        return (
            <div className="search-filters__filter">
                <SelectMultiple
                    options={options}
                    values={this.props.semesters}
                    label={this.props.translations.semester}
                    onChange={this.props.onSemestersChange}
                />
                <div className="text-muted search-filters__label">{this.props.translations.semester}</div>
            </div>
        );
    }

    renderLanguageFilter() {
        const options = ['finnish', 'swedish', 'english'].map(value => ({ value, label: this.props.translations[value] }));

        return (
            <div className="search-filters__filter">
                <SelectMultiple
                    options={options}
                    values={this.props.languages}
                    label={this.props.translations.language}
                    onChange={this.props.onLanguagesChange}
                />
                <div className="text-muted search-filters__label">{this.props.translations.language}</div>
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
                    {this.props.translations.findCourses}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="search-filters">
                {this.renderYearFilter()}
                {this.renderSemesterFilter()}
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