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
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};
