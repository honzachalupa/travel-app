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
    isHidden?: boolean;
    onClick: () => void;
}

interface IProps {
    singleItemAlignment?: string;
    items: (INavigationItem | null)[];
}

export default ({ items, singleItemAlignment }: IProps) => {
    const itemsFiltered = items.filter(x => x).filter(x => !x?.isHidden) as INavigationItem[];

    return itemsFiltered.length > 0 ? (
        <nav data-component="Navigation">
            <div className={cx('items', `items-count-${itemsFiltered.length}`, { [`alignment-${singleItemAlignment}`]: singleItemAlignment })}>
                {itemsFiltered.map(item => (
                    <ButtonWithIcon key={item.label} className="item" {...item} />
                ))}
            </div>
        </nav>
    ) : null;
};
