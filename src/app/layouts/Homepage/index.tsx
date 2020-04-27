import React from 'react';
import './style';

interface IProps {
    children: React.ReactNode;
}

export default ({ children }: IProps) => (
    <div data-component="Layout_Homepage">
        {children}
    </div>
);
