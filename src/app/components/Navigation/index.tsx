import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import React from 'react';
import './style';

interface INavigationItem {
    className?: string;
    label: string;
    icon: string;
    color: EColors;
    isDisabled?: boolean;
    onClick: () => void;
}

interface IProps {
    singleItemAlignment?: string;
    items: INavigationItem[];
}

export default (props: IProps) => (
    <nav data-component="Navigation">
        <div className={cx('items', `items-count-${props.items.length}`, { [`alignment-${props.singleItemAlignment}`]: props.singleItemAlignment })}>
            {props.items.map(item => (
                <ButtonWithIcon key={item.label} {...item} />
            ))}
        </div>
    </nav>
);
