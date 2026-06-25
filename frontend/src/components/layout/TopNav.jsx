import {
  RiNotification3Line,
  RiMoonLine,
  RiSunLine,
  RiMenuLine,
} from 'react-icons/ri';
import { useTheme } from '../../hooks/useTheme';

export default function TopNav({ title, onMobileMenuToggle }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        h-16 px-6
        bg-white/70 dark:bg-slate-900/70
        backdrop-blur-xl
        border-b border-gray-200/50 dark:border-slate-800/50
      "
    >
      {/* Left: Mobile menu + Page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <RiMenuLine className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {title || 'Dashboard'}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            Manage your Pinterest pins & campaigns
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          className="
            relative p-2.5 rounded-xl
            text-slate-500 dark:text-slate-400
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all duration-200
          "
        >
          <RiNotification3Line className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2.5 rounded-xl
            text-slate-500 dark:text-slate-400
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all duration-200
          "
        >
          {isDark ? (
            <RiSunLine className="w-5 h-5 text-amber-500" />
          ) : (
            <RiMoonLine className="w-5 h-5 text-indigo-500" />
          )}
        </button>
      </div>
    </header>
  );
}
