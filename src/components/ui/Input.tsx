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
    const baseClasses = [
        'px-4 py-3 border rounded-lg transition-all duration-200',
        'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'outline-none placeholder-gray-400',
        fullWidth ? 'w-full' : '',
        error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
        leftIcon ? 'pl-12' : '',
        rightIcon ? 'pr-12' : ''
    ].join(' ');

    const variantClasses = {
        default: 'bg-white',
        filled: 'bg-gray-50 hover:bg-gray-100',
        outlined: 'bg-transparent border-2'
    };

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{leftIcon}</span>
                    </div>
                )}

                <input
                    ref={ref}
                    className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${className}
          `}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{rightIcon}</span>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
});