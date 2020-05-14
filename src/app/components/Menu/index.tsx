import cx from 'classnames';
import React from 'react';
import './style';

interface IProps {
    isExpanded: boolean;
}

export default ({ isExpanded }: IProps) => (
    <nav data-component="Menu" className={cx({ 'is-expanded': isExpanded })}>
        Menu
    </nav>
);
