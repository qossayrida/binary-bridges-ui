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
        sm: 'ui-spinner-sm',
        md: 'ui-spinner-md',
        lg: 'ui-spinner-lg',
        xl: 'ui-spinner-xl'
    };

    const colorClasses = {
        blue: 'ui-spinner-blue',
        white: 'ui-spinner-white',
        gray: 'ui-spinner-gray',
        green: 'ui-spinner-green',
        red: 'ui-spinner-red'
    };

    const spinnerElement = (
        <div
            className={`
        ui-spinner
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
      `}
        />
    );

    if (text) {
        const containerClasses = centered
            ? 'ui-spinner-container-centered'
            : 'ui-spinner-container ui-space-x-3';

        return (
            <div className={containerClasses}>
                {spinnerElement}
                <span className={`ui-spinner-text ${centered ? 'ui-spinner-text-centered' : ''}`}>
          {text}
        </span>
            </div>
        );
    }

    if (centered) {
        return (
            <div className="ui-spinner-container-centered">
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
    <div className="ui-page-loader">
        <LoadingSpinner size="xl" text={text} centered/>
    </div>
);

// Section-level loading component
export const SectionLoader: React.FC<{ text?: string; className?: string }> = ({
                                                                                   text = 'Loading...',
                                                                               }) => (
    <div className="data-page loading">
        <div className="page-container">
            <div className="loading-container">
                <LoadingSpinner size="lg" text={text} centered/>
            </div>
        </div>
    </div>
);
