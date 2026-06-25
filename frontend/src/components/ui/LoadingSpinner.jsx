const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

export default function LoadingSpinner({ size = 'md', className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeMap[size] || sizeMap.md}
          rounded-full
          border-indigo-200 dark:border-indigo-900
          border-t-indigo-500 dark:border-t-indigo-400
          animate-spin
        `}
      />
    </div>
  );
}
