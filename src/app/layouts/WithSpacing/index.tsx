import React from 'react';
import './style';

interface IProps {
    title?: string;
    children: React.ReactNode;
}

export default ({ title, children }: IProps) => (
    <div data-component="Layout_WithSpacing">
        {title && (
            <h1 className="page-title">{title}</h1>
        )}

        {children}
    </div>
);
