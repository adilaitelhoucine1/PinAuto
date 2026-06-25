import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title = 'Nothing here yet',
  description = '',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fadeIn">
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
          <Icon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
      )}
      <h4 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-4">
          {description}
        </p>
      )}
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick} icon={action.icon}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
