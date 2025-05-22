import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outlined';
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                   label,
                                                                   error,
                                                                   helperText,
                                                                   leftIcon,
                                                                   rightIcon,
                                                                   variant = 'default',
                                                                   fullWidth = true,
                                                                   className = '',
                                                                   ...props
                                                               }, ref) => {
    const getInputClasses = () => {
        const classes = ['ui-input'];

        if (error) classes.push('ui-input-error');
        if (leftIcon) classes.push('ui-input-with-left-icon');
        if (rightIcon) classes.push('ui-input-with-right-icon');

        if (variant === 'filled') classes.push('ui-input-filled');
        if (variant === 'outlined') classes.push('ui-input-outlined');

        if (className) classes.push(className);

        return classes.join(' ');
    };

    return (
        <div className={fullWidth ? 'ui-input-wrapper' : ''}>
            {label && (
                <label className="ui-input-label">
                    {label}
                    {props.required && <span className="ui-input-required">*</span>}
                </label>
            )}

            <div className="ui-input-container">
                {leftIcon && (
                    <div className="ui-input-icon-left">
                        <span>{leftIcon}</span>
                    </div>
                )}

                <input
                    ref={ref}
                    className={getInputClasses()}
                    {...props}
                />

                {rightIcon && (
                    <div className="ui-input-icon-right">
                        <span>{rightIcon}</span>
                    </div>
                )}
            </div>

            {error && (
                <p className="ui-input-error-text">{error}</p>
            )}

            {helperText && !error && (
                <p className="ui-input-helper-text">{helperText}</p>
            )}
        </div>
    );
});
