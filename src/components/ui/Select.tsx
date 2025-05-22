import React from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    name: string;
    label?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
                                                  name,
                                                  label,
                                                  value,
                                                  onChange,
                                                  options,
                                                  required = false,
                                                  disabled = false,
                                                  error,
                                                  className = ''
                                              }) => {
    return (
        <div className={`ui-w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="ui-input-label">
                    {label} {required && <span className="ui-input-required">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`ui-select ${
                    error ? 'ui-select-error' : ''
                }`}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="ui-input-error-text">{error}</p>}
        </div>
    );
};
