import React from 'react';

export interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray' | 'green' | 'red';
    className?: string;
    text?: string;
    centered?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 'md',
                                                                  color = 'blue',
                                                                  className = '',
                                                                  text,
                                                                  centered = false
                                                              }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12'
    };

    const colorClasses = {
        blue: 'border-blue-500',
        white: 'border-white',
        gray: 'border-gray-500',
        green: 'border-green-500',
        red: 'border-red-500'
    };

    const spinnerElement = (
        <div
            className={`
        animate-spin rounded-full border-2 border-t-transparent
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
      `}
        />
    );

    if (text) {
        const containerClasses = centered
            ? 'flex flex-col items-center justify-center p-8'
            : 'flex items-center space-x-3';

        return (
            <div className={containerClasses}>
                {spinnerElement}
                <span className={`text-gray-600 ${centered ? 'mt-3' : ''}`}>
          {text}
        </span>
            </div>
        );
    }

    if (centered) {
        return (
            <div className="flex items-center justify-center p-8">
                {spinnerElement}
            </div>
        );
    }

    return spinnerElement;
};

// Page-level loading component
export const PageLoader: React.FC<{ text?: string }> = ({
                                                            text = 'Loading...'
                                                        }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="xl" text={text} centered />
    </div>
);

// Section-level loading component
export const SectionLoader: React.FC<{ text?: string; className?: string }> = ({
                                                                                   text = 'Loading...',
                                                                                   className = 'py-12'
                                                                               }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <LoadingSpinner size="lg" text={text} centered />
    </div>
);