import React from 'react';
import './style';

interface IProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default ({ title, children, className }: IProps) => {
    return (
        <div data-component="Layout_WithSpacing" className={className}>
            {title && (
                <h1 className="page-title">{title}</h1>
            )}

            {children}
        </div>
    );
};
