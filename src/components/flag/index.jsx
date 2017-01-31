// @flow

import React from 'react';
import cn from 'classnames';

type Props = {
    code: string,
    squared: boolean,
    className: string,
};

const alias = {
    'en': 'gb',
    'sv': 'se',
};

class Flag extends React.Component {
    props: Props

    static defaultProps = {
        squared: false,
        className: '',
    }

    getCode(): string {
        return alias[this.props.code] || this.props.code;
    }

    render() {
        const classes = cn(
            {
                'flag-icon': true,
                [`flag-icon-${this.getCode()}`]: true,
                'flag-icon-squared': this.props.squared,
            },
            this.props.className
        );

        return <span className={classes} />;
    }
}

export default Flag;