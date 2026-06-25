export default function Input({
  label,
  error,
  type = 'text',
  textarea = false,
  className = '',
  ...rest
}) {
  const baseClasses = `
    w-full rounded-xl px-4 py-2.5
    bg-slate-50 dark:bg-slate-900/50
    border border-slate-200 dark:border-slate-700
    text-slate-900 dark:text-slate-100
    placeholder-slate-400 dark:placeholder-slate-500
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
    hover:border-slate-300 dark:hover:border-slate-600
    text-sm
    ${error ? 'border-red-400 dark:border-red-500 focus:ring-red-500/40 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          className={`${baseClasses} min-h-[100px] resize-y`}
          {...rest}
        />
      ) : (
        <input
          type={type}
          className={baseClasses}
          {...rest}
        />
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
