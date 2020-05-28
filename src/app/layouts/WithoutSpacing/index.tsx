import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { IContext } from 'Interfaces/Context';
import React, { useContext } from 'react';
import './style';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default ({ children, className }: IProps) => {
    const { isDarkModeOn } = useContext(Context) as IContext;

    return (
        <div data-component="Layout_WithoutSpacing" className={cx(className, { 'id-dark-mode': isDarkModeOn })}>
            {children}
        </div>
    );
};
