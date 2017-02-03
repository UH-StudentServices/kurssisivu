// @flow

import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';

import Flag from 'components/flag';
import { updateLanguage } from 'state/settings';

type Props = {
    language: string,
    availableLanguages: ({ name: string, code: string })[],
    onLanguageChange: (string) => void,
};

class LanguageSelector extends React.Component {
    props: Props

    static defaultProps = {}

    renderLanguages() {
        return this.props.availableLanguages.map(({ code, name }) => {
            const isActive = code === this.props.language;

            return (
                <Button 
                    size="sm"
                    key={code} 
                    active={isActive}
                    onClick={() => { this.props.onLanguageChange(code) }}
                >
                    <Flag code={code} squared className="language-selector__flag" /> {name}
                </Button>
            );
        });
    }

    render() {
        return (
            <ButtonGroup className="language-selector">
                {this.renderLanguages()}
            </ButtonGroup>
        )
    }
}

const mapStateToProps = (state: Object) => ({
    language: state.settings.language,
    availableLanguages: state.settings.availableLanguages,
});

const mapDispatchToProps = (dispatch: any) => ({
    onLanguageChange: language => { dispatch(updateLanguage(language)) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LanguageSelector);