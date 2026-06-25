import {
  RiSparklingLine,
  RiLock2Line,
  RiMagicLine,
} from 'react-icons/ri';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function AiGeneratorCard() {
  return (
    <Card
      title="AI Image Generator"
      icon={RiSparklingLine}
      gradient
      badge={
        <Badge variant="purple" size="sm" pulse>
          Coming Soon
        </Badge>
      }
    >
      <div className="relative">
        {/* Disabled overlay */}
        <div className="absolute inset-0 z-10 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-not-allowed">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-3 shadow-lg">
            <RiLock2Line className="w-7 h-7 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <RiMagicLine className="w-4 h-4 text-purple-500" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              AI Generation
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-[200px]">
            Will be available in a future update
          </p>
        </div>

        {/* Disabled form content */}
        <div className="space-y-4 opacity-30 pointer-events-none select-none">
          {/* Prompt */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Prompt
            </label>
            <textarea
              disabled
              placeholder="Describe the image you want to generate..."
              className="
                w-full rounded-xl px-4 py-2.5 min-h-[80px] text-sm
                bg-slate-50 dark:bg-slate-900/50
                border border-slate-200 dark:border-slate-700
                text-slate-400
              "
            />
          </div>

          {/* Image Size */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Image Size
            </label>
            <select
              disabled
              className="
                w-full rounded-xl px-4 py-2.5 text-sm
                bg-slate-50 dark:bg-slate-900/50
                border border-slate-200 dark:border-slate-700
                text-slate-400
              "
            >
              <option>1024 × 1024</option>
              <option>1024 × 1536</option>
              <option>1536 × 1024</option>
            </select>
          </div>

          {/* Style */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Style
            </label>
            <select
              disabled
              className="
                w-full rounded-xl px-4 py-2.5 text-sm
                bg-slate-50 dark:bg-slate-900/50
                border border-slate-200 dark:border-slate-700
                text-slate-400
              "
            >
              <option>Realistic</option>
              <option>Illustration</option>
              <option>Watercolor</option>
              <option>Digital Art</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            disabled
            className="
              w-full py-2.5 rounded-xl text-sm font-medium
              bg-gradient-to-r from-purple-500 to-indigo-500
              text-white opacity-50
            "
          >
            <span className="flex items-center justify-center gap-2">
              <RiSparklingLine className="w-4 h-4" />
              Generate Image
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}
