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
    items: (INavigationItem | null)[];
}

export default ({ items, singleItemAlignment }: IProps) => (
    <nav data-component="Navigation">
        <div className={cx('items', `items-count-${items.length}`, { [`alignment-${singleItemAlignment}`]: singleItemAlignment })}>
            {items.map(item => item ? (
                <ButtonWithIcon key={item.label} className="item" {...item} />
            ) : null)}
        </div>
    </nav>
);
