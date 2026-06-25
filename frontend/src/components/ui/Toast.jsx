import { useEffect, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiAlertFill,
  RiInformationFill,
  RiCloseLine,
} from 'react-icons/ri';

const typeConfig = {
  success: {
    icon: RiCheckboxCircleFill,
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    iconColor: 'text-emerald-500',
    progressColor: 'bg-emerald-500',
  },
  error: {
    icon: RiCloseCircleFill,
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    iconColor: 'text-red-500',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: RiAlertFill,
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/30',
    iconColor: 'text-amber-500',
    progressColor: 'bg-amber-500',
  },
  info: {
    icon: RiInformationFill,
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/30',
    iconColor: 'text-blue-500',
    progressColor: 'bg-blue-500',
  },
};

export default function Toast({ id, message, type = 'info', onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`
        pointer-events-auto
        relative overflow-hidden rounded-xl
        ${config.bg} ${config.border}
        border backdrop-blur-xl
        shadow-lg shadow-black/5 dark:shadow-black/20
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
          {message}
        </p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-0.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <RiCloseLine className="w-4 h-4" />
        </button>
      </div>
      {/* Auto-progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5">
        <div className={`h-full ${config.progressColor} toast-progress opacity-60`} />
      </div>
    </div>
  );
}
