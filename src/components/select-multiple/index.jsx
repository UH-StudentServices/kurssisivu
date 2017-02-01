// @flow

import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cn from 'classnames';

type Props = {
    label: string,
    options: ({ value: string, label: string })[],
    values: string[],
    onChange: (string[]) => void, 
};

type State = {
    isOpen: boolean,
};

class SelectMultiple extends React.Component {
    props: Props

    state: State

    static defaultProps = {
        onChange: (values: string[]) => {},
    }

    constructor() {
        super();

        this.state = {
            isOpen: false,
        };
    }

    renderLabel() {
        return this.props.values.length === 0
            ? this.props.label
            : `${this.props.label}: ${this.renderValues()}`;
    }

    renderValues() {
        return this.props.options
            .filter(({ value }) => this.props.values.indexOf(value) >= 0)
            .map(({ label }) => label)
            .join(', ');
    }

    isChosen(targetValue: string): boolean {
        return !!this.props.values.find(value => value === targetValue);
    }

    onChooseValue(value: string): void {
        const copy = [...[], ...this.props.values];

        if(!this.isChosen(value)) {
            this.props.onChange([...copy, value]);
        } else {
            const without = copy.splice(copy.indexOf(value), 1);

            this.props.onChange(copy);
        }
    }

    renderOptions() {
        const activeClasses = 'select-multiple__option--active';

        return this.props.options.map(option => {
            const classes = cn({ [activeClasses]: this.isChosen(option.value) });

            return (
                <DropdownItem className={classes} onClick={() => this.onChooseValue(option.value)} key={option.value}>
                    {option.label}
                </DropdownItem>
            );
        });
    }

    onToggle() {
        const { isOpen } = this.state;

        this.setState({
            isOpen: !isOpen,
        });
    }

    render() {
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={this.onToggle.bind(this)}>
            <DropdownToggle caret>
                {this.renderLabel()}
            </DropdownToggle>
            <DropdownMenu>
                {this.renderOptions()}
            </DropdownMenu>
        </Dropdown>
        )
    }
}

export default SelectMultiple;