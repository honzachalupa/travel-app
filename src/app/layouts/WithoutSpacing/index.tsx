import React from 'react';
import './style';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default ({ children, className }: IProps) => {
    return (
        <div data-component="Layout_WithoutSpacing" className={className}>
            {children}
        </div>
    );
};
