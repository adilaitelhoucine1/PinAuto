import { RiLoader4Line } from 'react-icons/ri';

const variants = {
  primary: `
    bg-gradient-to-r from-indigo-500 to-indigo-600
    hover:from-indigo-600 hover:to-indigo-700
    text-white shadow-lg shadow-indigo-500/25
    hover:shadow-xl hover:shadow-indigo-500/30
    active:scale-[0.97]
    focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900
  `,
  secondary: `
    bg-slate-100 dark:bg-slate-700/60
    text-slate-700 dark:text-slate-200
    hover:bg-slate-200 dark:hover:bg-slate-700
    border border-slate-200 dark:border-slate-600
    active:scale-[0.97]
    focus:ring-2 focus:ring-slate-400/50
  `,
  ghost: `
    bg-transparent
    text-slate-600 dark:text-slate-300
    hover:bg-slate-100 dark:hover:bg-slate-800
    active:scale-[0.97]
    focus:ring-2 focus:ring-slate-400/30
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-red-600
    hover:from-red-600 hover:to-red-700
    text-white shadow-lg shadow-red-500/25
    hover:shadow-xl hover:shadow-red-500/30
    active:scale-[0.97]
    focus:ring-2 focus:ring-red-500/50
  `,
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  className = '',
  type = 'button',
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200 ease-out
        outline-none cursor-pointer select-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
    >
      {loading ? (
        <RiLoader4Line className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      {children && <span>{children}</span>}
    </button>
  );
}
