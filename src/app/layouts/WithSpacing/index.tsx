import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { IContext } from 'Interfaces/Context';
import React, { useContext } from 'react';
import './style';

interface IProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default ({ title, children, className }: IProps) => {
    const { isDarkModeOn } = useContext(Context) as IContext;

    return (
        <div data-component="Layout_WithSpacing" className={cx(className, { 'id-dark-mode': isDarkModeOn })}>
            {title && (
                <h1 className="page-title">{title}</h1>
            )}

            {children}
        </div>
    );
};
