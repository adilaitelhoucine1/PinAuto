import { RiArrowRightUpLine } from 'react-icons/ri';

export default function Card({
  children,
  className = '',
  title,
  subtitle,
  icon: Icon,
  badge,
  gradient,
  noPadding,
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/80 dark:bg-slate-800/50
        backdrop-blur-xl
        border border-gray-200/80 dark:border-slate-700/50
        shadow-glass
        transition-all duration-300 ease-out
        hover:shadow-glass-lg hover:-translate-y-0.5
        ${className}
      `}
    >
      {/* Optional gradient header */}
      {gradient && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-500" />
      )}

      {/* Header */}
      {(title || badge) && (
        <div className={`flex items-center justify-between ${gradient ? 'pt-5' : 'pt-5'} px-6 pb-0`}>
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}

      {/* Content */}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
}
