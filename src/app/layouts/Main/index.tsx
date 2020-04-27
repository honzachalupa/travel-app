import React from 'react';
import './style';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default ({ children, className }: IProps) => (
    <div data-component="Layout_Main" className={className}>
        {children}
    </div>
);
