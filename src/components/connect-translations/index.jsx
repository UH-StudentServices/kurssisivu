// @flow

import React from 'react';
import { connect } from 'react-redux';

import { selectActiveTranslations } from 'selectors/translations';

const mapStateToProps = (state: Object) => ({
    translations: selectActiveTranslations(state),
});

function connectTranslations() {
    return (Component: ReactClass<any>) => {
        const DecoratorComponent = props => <Component {...props} />;

        return connect(
            mapStateToProps
        )(DecoratorComponent);
    }
}

export default connectTranslations;