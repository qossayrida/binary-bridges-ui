import React from 'react';
import {LoadingSpinner} from './LoadingSpinner';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
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
                                                  type = ' ',
                                                  disabled = false,
                                                  loading = false,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  className = '',
                                                  fullWidth = false,
                                                  icon
                                              }) => {
    const baseClasses = [
        'inline-flex items-center justify-center',
        'font-medium rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : ''
    ].join(' ');

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        facebook: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
        >
            {loading ? (
                <>
                    <LoadingSpinner size="sm" className="mr-2"/>
                    Processing...
                </>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};