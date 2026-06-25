import { useState, useCallback } from 'react';
import {
  RiCloseLine,
  RiAddLine,
  RiSaveLine,
  RiRefreshLine,
} from 'react-icons/ri';
import Input from '../ui/Input';
import Button from '../ui/Button';

const initialFormData = {
  title: '',
  description: '',
  url: '',
  board: '',
  keywords: [],
  altText: '',
  tags: [],
  scheduleDate: '',
  notes: '',
};

export default function ListingForm({ formData: externalFormData, onChange, errors = {} }) {
  const formData = externalFormData || initialFormData;

  const handleChange = (field, value) => {
    onChange?.({ ...formData, [field]: value });
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const keyword = e.target.value.trim();
      if (!formData.keywords.includes(keyword)) {
        handleChange('keywords', [...formData.keywords, keyword]);
      }
      e.target.value = '';
    }
  };

  const removeKeyword = (keyword) => {
    handleChange(
      'keywords',
      formData.keywords.filter((k) => k !== keyword)
    );
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!formData.tags.includes(tag)) {
        handleChange('tags', [...formData.tags, tag]);
      }
      e.target.value = '';
    }
  };

  const removeTag = (tag) => {
    handleChange(
      'tags',
      formData.tags.filter((t) => t !== tag)
    );
  };

  const handleReset = () => {
    onChange?.(initialFormData);
  };

  return (
    <div className="space-y-6">
      {/* Section: Basic Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Basic Information
          </h4>
        </div>

        <Input
          label="Pin Title"
          placeholder="Enter an engaging pin title..."
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
        />

        <Input
          label="Description"
          textarea
          placeholder="Write a detailed description for your pin. Include relevant keywords for search..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        <Input
          label="Destination URL"
          type="url"
          placeholder="https://www.amazon.com/dp/..."
          value={formData.url}
          onChange={(e) => handleChange('url', e.target.value)}
          error={errors.url}
        />

        <Input
          label="Board Name"
          placeholder="e.g., KDP Books, Low Content Books..."
          value={formData.board}
          onChange={(e) => handleChange('board', e.target.value)}
          error={errors.board}
        />
      </div>

      {/* Section: SEO & Keywords */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            SEO & Keywords
          </h4>
        </div>

        {/* Keywords Tag Input */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Keywords
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.keywords.map((keyword) => (
              <span
                key={keyword}
                className="
                  inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium
                  bg-indigo-100 dark:bg-indigo-500/20
                  text-indigo-700 dark:text-indigo-300
                  border border-indigo-200 dark:border-indigo-500/30
                "
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="p-0.5 rounded hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors"
                >
                  <RiCloseLine className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a keyword and press Enter..."
            onKeyDown={handleKeywordKeyDown}
            className="
              w-full rounded-xl px-4 py-2.5
              bg-slate-50 dark:bg-slate-900/50
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              placeholder-slate-400 dark:placeholder-slate-500
              transition-all duration-200 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
              hover:border-slate-300 dark:hover:border-slate-600
            "
          />
        </div>

        <Input
          label="Alt Text"
          placeholder="Describe the image for accessibility..."
          value={formData.altText}
          onChange={(e) => handleChange('altText', e.target.value)}
        />

        {/* Tags Input */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium
                  bg-purple-100 dark:bg-purple-500/20
                  text-purple-700 dark:text-purple-300
                  border border-purple-200 dark:border-purple-500/30
                "
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="p-0.5 rounded hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors"
                >
                  <RiCloseLine className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a tag and press Enter..."
            onKeyDown={handleTagKeyDown}
            className="
              w-full rounded-xl px-4 py-2.5
              bg-slate-50 dark:bg-slate-900/50
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              placeholder-slate-400 dark:placeholder-slate-500
              transition-all duration-200 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
              hover:border-slate-300 dark:hover:border-slate-600
            "
          />
        </div>
      </div>

      {/* Section: Optional */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Optional Settings
          </h4>
        </div>

        <Input
          label="Schedule Date"
          type="datetime-local"
          value={formData.scheduleDate}
          onChange={(e) => handleChange('scheduleDate', e.target.value)}
        />

        <Input
          label="Notes"
          textarea
          placeholder="Internal notes (not published)..."
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="secondary" icon={RiRefreshLine} onClick={handleReset} size="sm">
          Reset
        </Button>
      </div>
    </div>
  );
}
