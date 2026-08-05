import React, { useState } from 'react';
import api from '../api/axios';

const LinkForm = ({ onLinkAdded }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/links', { url: url.trim() });
      onLinkAdded(res.data.link);
      setUrl('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to generate preview for this URL.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 mb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* URL input */}
        <div className="flex-grow relative">
          {/* Search icon inside input */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-sage">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder="Paste a URL to preview…"
            className="glass-input"
            style={{ paddingLeft: '2.5rem' }}
            disabled={loading}
            required
            id="link-url-input"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="brass-btn whitespace-nowrap shrink-0"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin-slow rounded-full border-2 border-ink/30 border-t-ink" />
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.5 1v13M1 7.5h13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Save &amp; Preview
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="text-brick text-sm mt-3 motion-safe:animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default LinkForm;
