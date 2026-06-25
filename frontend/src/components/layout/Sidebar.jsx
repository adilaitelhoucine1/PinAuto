import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiImageLine,
  RiPushpinLine,
  RiSettings4Line,
  RiBarChartLine,
  RiPinterestFill,
  RiMoonLine,
  RiSunLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri';
import { useTheme } from '../../hooks/useTheme';
import Badge from '../ui/Badge';

const navItems = [
  { path: '/', icon: RiDashboardLine, label: 'Dashboard', enabled: true },
  { path: '/images', icon: RiImageLine, label: 'Images', enabled: true },
  { path: '/campaigns', icon: RiPushpinLine, label: 'Campaigns', enabled: true },
  { path: '/settings', icon: RiSettings4Line, label: 'Settings', enabled: false },
  { path: '/analytics', icon: RiBarChartLine, label: 'Analytics', enabled: false, badge: 'Soon' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-50
        flex flex-col
        bg-white/90 dark:bg-slate-900/95
        backdrop-blur-2xl
        border-r border-gray-200/80 dark:border-slate-800
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      {/* Brand */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 h-16 border-b border-gray-100 dark:border-slate-800`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <RiPinterestFill className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">
              Pinterest Manager
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              Upload & Publish
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.enabled ? item.path : '#'}
              onClick={(e) => !item.enabled && e.preventDefault()}
              className={`
                relative flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl
                transition-all duration-200 group
                ${!item.enabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${active
                  ? 'bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
              )}

              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-indigo-500 dark:text-indigo-400' : ''}`} />

              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="purple" size="sm" pulse>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}

              {/* Tooltip for collapsed */}
              {collapsed && (
                <div className="
                  absolute left-full ml-3 px-2.5 py-1.5 rounded-lg
                  bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium
                  whitespace-nowrap opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 z-50
                  shadow-lg
                ">
                  {item.label}
                  {item.badge && <span className="ml-1.5 text-purple-300">({item.badge})</span>}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-100 dark:border-slate-800 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full px-3 py-2.5 rounded-xl
            text-slate-600 dark:text-slate-400
            hover:bg-slate-100 dark:hover:bg-slate-800/60
            hover:text-slate-900 dark:hover:text-slate-200
            transition-all duration-200
          `}
        >
          {isDark ? (
            <RiSunLine className="w-5 h-5 flex-shrink-0 text-amber-500" />
          ) : (
            <RiMoonLine className="w-5 h-5 flex-shrink-0 text-indigo-500" />
          )}
          {!collapsed && (
            <span className="text-sm font-medium">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className={`
            flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full px-3 py-2.5 rounded-xl
            text-slate-600 dark:text-slate-400
            hover:bg-slate-100 dark:hover:bg-slate-800/60
            hover:text-slate-900 dark:hover:text-slate-200
            transition-all duration-200
          `}
        >
          {collapsed ? (
            <RiMenuUnfoldLine className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <RiMenuFoldLine className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
