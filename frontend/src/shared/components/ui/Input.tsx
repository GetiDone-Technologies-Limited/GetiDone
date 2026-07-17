import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, wrapperClassName = '', className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400',
              'transition-all duration-150 focus:outline-none focus:ring-2',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-300'
                : 'border-slate-300 focus:border-primary-500 focus:ring-primary-200',
              leftIcon ? 'pl-9' : '',
              rightIcon ? 'pr-9' : '',
              className,
            ].join(' ')}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

