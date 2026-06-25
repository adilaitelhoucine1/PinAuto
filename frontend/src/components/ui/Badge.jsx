const variantStyles = {
  success: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
  warning: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
  error: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30',
  info: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
  purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({
  children,
  variant = 'info',
  size = 'md',
  pulse = false,
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${variantStyles[variant] || variantStyles.info}
        ${sizeStyles[size] || sizeStyles.md}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`
              animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
              ${variant === 'success' ? 'bg-emerald-400' : ''}
              ${variant === 'warning' ? 'bg-amber-400' : ''}
              ${variant === 'error' ? 'bg-red-400' : ''}
              ${variant === 'info' ? 'bg-blue-400' : ''}
              ${variant === 'purple' ? 'bg-purple-400' : ''}
            `}
          />
          <span
            className={`
              relative inline-flex rounded-full h-2 w-2
              ${variant === 'success' ? 'bg-emerald-500' : ''}
              ${variant === 'warning' ? 'bg-amber-500' : ''}
              ${variant === 'error' ? 'bg-red-500' : ''}
              ${variant === 'info' ? 'bg-blue-500' : ''}
              ${variant === 'purple' ? 'bg-purple-500' : ''}
            `}
          />
        </span>
      )}
      {children}
    </span>
  );
}
