import { useState } from 'react';
import {
  RiPinterestFill,
  RiSendPlaneFill,
  RiCheckDoubleLine,
  RiAlertLine,
  RiTimeLine,
  RiTestTubeLine,
} from 'react-icons/ri';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { validateCampaign } from '../../utils/validators';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../hooks/useToast';

export default function PublishCard({
  images = [],
  formData = {},
  onPublish,
  loading = false,
  status = 'idle', // idle | validating | publishing | published | error
  lastPublishTime,
}) {
  const { addToast } = useToast();
  const [localStatus, setLocalStatus] = useState(status);

  const handlePublish = async () => {
    // Validate
    const validation = validateCampaign({
      ...formData,
      images,
    });

    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors);
      errorMessages.forEach((msg) => addToast(msg, 'error'));
      setLocalStatus('error');
      setTimeout(() => setLocalStatus('idle'), 3000);
      return;
    }

    setLocalStatus('publishing');

    try {
      await onPublish?.();
      setLocalStatus('published');
      addToast('Pin published to Pinterest successfully!', 'success');
    } catch (err) {
      setLocalStatus('error');
      addToast('Failed to publish pin', 'error');
      setTimeout(() => setLocalStatus('idle'), 3000);
    }
  };

  const currentStatus = status !== 'idle' ? status : localStatus;

  const statusConfig = {
    idle: {
      color: 'text-slate-400 dark:text-slate-500',
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'Ready to publish',
      icon: RiSendPlaneFill,
    },
    validating: {
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      text: 'Validating...',
      icon: RiAlertLine,
    },
    publishing: {
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
      text: 'Publishing...',
      icon: RiSendPlaneFill,
    },
    published: {
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      text: 'Published!',
      icon: RiCheckDoubleLine,
    },
    error: {
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-500/10',
      text: 'Validation failed',
      icon: RiAlertLine,
    },
  };

  const sc = statusConfig[currentStatus] || statusConfig.idle;
  const StatusIcon = sc.icon;

  return (
    <Card
      title="Publish to Pinterest"
      icon={RiPinterestFill}
      gradient
      badge={
        <Badge variant="info" size="sm">
          <RiTestTubeLine className="w-3 h-3" />
          Simulated
        </Badge>
      }
    >
      <div className="flex flex-col items-center text-center">
        {/* Pinterest Logo */}
        <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/20 mb-5">
          <RiPinterestFill className="w-10 h-10 text-white" />
        </div>

        {/* Status */}
        <div
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full mb-5
            ${sc.bg}
          `}
        >
          <StatusIcon className={`w-4 h-4 ${sc.color} ${currentStatus === 'publishing' ? 'animate-spin' : ''}`} />
          <span className={`text-sm font-medium ${sc.color}`}>{sc.text}</span>
        </div>

        {/* Publish Button */}
        <Button
          variant="primary"
          size="lg"
          icon={RiSendPlaneFill}
          onClick={handlePublish}
          loading={loading || currentStatus === 'publishing'}
          disabled={currentStatus === 'publishing'}
          className="w-full max-w-xs text-base shadow-xl shadow-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/30"
        >
          {currentStatus === 'published' ? 'Publish Again' : 'Publish Pin'}
        </Button>

        {/* Info text */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 max-w-xs">
          This will create a campaign and publish your pin to the selected Pinterest board.
        </p>

        {/* Last Publish Time */}
        {lastPublishTime && (
          <div className="flex items-center gap-1.5 mt-4 text-xs text-slate-400 dark:text-slate-500">
            <RiTimeLine className="w-3.5 h-3.5" />
            <span>Last published: {formatDate(lastPublishTime)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
