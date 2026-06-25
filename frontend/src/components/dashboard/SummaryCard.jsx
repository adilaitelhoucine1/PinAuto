import {
  RiClipboardLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiImageLine,
  RiLink,
  RiDashboard3Line,
  RiHashtag,
  RiText,
} from 'react-icons/ri';
import Card from '../ui/Card';
import { truncateText } from '../../utils/formatters';

export default function SummaryCard({ images = [], formData = {} }) {
  const checks = [
    {
      label: 'Pin title set',
      passed: !!formData.title?.trim(),
      icon: RiText,
    },
    {
      label: 'Description added',
      passed: !!formData.description?.trim() && formData.description.trim().length >= 10,
      icon: RiClipboardLine,
    },
    {
      label: 'Destination URL',
      passed: !!formData.url?.trim(),
      icon: RiLink,
    },
    {
      label: 'Board selected',
      passed: !!formData.board?.trim(),
      icon: RiDashboard3Line,
    },
    {
      label: 'Images uploaded',
      passed: images.length > 0,
      icon: RiImageLine,
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const allPassed = passedCount === checks.length;

  return (
    <Card
      title="Upload Summary"
      icon={RiClipboardLine}
      gradient
      badge={
        <span
          className={`
            inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
            ${allPassed
              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
              : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
            }
          `}
        >
          {passedCount}/{checks.length} ready
        </span>
      }
    >
      {/* Image Thumbnails Row */}
      {images.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
            Selected Images
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((img, i) => (
              <div
                key={img.id || i}
                className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm"
              >
                <img
                  src={img.url || img.preview || ''}
                  alt={img.name || 'Image'}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-12 h-12 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-400">{images.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Summary Info */}
      <div className="space-y-3 mb-5">
        <SummaryRow
          label="Pin Title"
          value={formData.title ? truncateText(formData.title, 40) : 'Not set'}
          isEmpty={!formData.title}
        />
        <SummaryRow
          label="Destination URL"
          value={formData.url ? truncateText(formData.url, 35) : 'Not set'}
          isEmpty={!formData.url}
        />
        <SummaryRow
          label="Board"
          value={formData.board || 'Not set'}
          isEmpty={!formData.board}
        />
        <SummaryRow
          label="Images"
          value={`${images.length} image${images.length !== 1 ? 's' : ''}`}
          isEmpty={images.length === 0}
        />
      </div>

      {/* Keywords */}
      {formData.keywords?.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
            Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {formData.keywords.map((kw) => (
              <span
                key={kw}
                className="
                  inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium
                  bg-indigo-50 dark:bg-indigo-500/10
                  text-indigo-600 dark:text-indigo-400
                "
              >
                <RiHashtag className="w-3 h-3" />
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Validation Checklist */}
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          Publish Checklist
        </p>
        <div className="space-y-2">
          {checks.map((check) => {
            const CheckIcon = check.icon;
            return (
              <div
                key={check.label}
                className={`
                  flex items-center gap-2.5 px-3 py-2 rounded-lg
                  ${check.passed
                    ? 'bg-emerald-50 dark:bg-emerald-500/5'
                    : 'bg-red-50 dark:bg-red-500/5'
                  }
                `}
              >
                {check.passed ? (
                  <RiCheckboxCircleLine className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <RiCloseCircleLine className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <span
                  className={`text-xs font-medium ${
                    check.passed
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function SummaryRow({ label, value, isEmpty }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={`text-xs font-medium ${
          isEmpty
            ? 'text-slate-400 dark:text-slate-500 italic'
            : 'text-slate-800 dark:text-slate-200'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
