// @flow

import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';

type Props = {
    language: string,
    availableLanguages: ({ name: string, code: string })[],
};

class LanguageSelector extends React.Component {
    props: Props

    static defaultProps = {}

    renderLanguages() {
        return this.props.availableLanguages.map(({ code, name }) => {
            return (
                <Button>
                    {name}
                </Button>
            );
        });
    }

    render() {
        return (
            <ButtonGroup>
                {this.renderLanguages()}
            </ButtonGroup>
        )
    }
}

const mapStateToProps = (state: Object) => ({
    language: state.settings.language,
    availableLanguages: state.settings.availableLanguages,
});

export default connect(
    mapStateToProps,
)(LanguageSelector);