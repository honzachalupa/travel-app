import React from 'react';
import './style';

interface IProps {
    label?: string;
    type?: 'submit' | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default ({ label, type, children, ...props }: IProps) => (
    <button type={type || 'button'} {...props} data-component="Button">{children || label}</button>
);
