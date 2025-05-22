import React from 'react';
import {LoadingSpinner} from './LoadingSpinner';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'facebook' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  type = 'button',
                                                  disabled = false,
                                                  loading = false,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  className = '',
                                                  fullWidth = false,
                                                  icon
                                              }) => {
    const getButtonClasses = () => {
        const classes = ['ui-btn'];

        // Add size class
        classes.push(`ui-btn-${size}`);

        // Add variant class
        classes.push(`ui-btn-${variant}`);

        // Add full width class if needed
        if (fullWidth) classes.push('ui-btn-full');

        // Add custom class if provided
        if (className) classes.push(className);

        return classes.join(' ');
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={getButtonClasses()}
        >
            {loading ? (
                <>
                    <LoadingSpinner size="sm" className="ui-mr-2"/>
                    Processing...
                </>
            ) : (
                <>
                    {icon && <span className="ui-btn-icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};
