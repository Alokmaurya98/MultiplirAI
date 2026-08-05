import React, { useState } from 'react';

const PreviewCard = ({ link, onDelete, style }) => {
  const [imgError, setImgError] = useState(false);

  /* Extract bare domain from URL */
  const domain = (() => {
    try {
      return new URL(link.url).hostname.replace('www.', '');
    } catch {
      return link.url;
    }
  })();

  const formattedDate = new Date(link.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article
      className="glass glass-hover group overflow-hidden flex flex-col opacity-0 motion-safe:animate-card-enter motion-reduce:opacity-100"
      style={style}
    >
      {/* ── Thumbnail / OG image ───────────────────────────── */}
      <div
        className="relative h-44 overflow-hidden shrink-0"
        style={{ borderRadius: '20px 20px 0 0' }}
      >
        {link.image && !imgError ? (
          <>
            <img
              src={link.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            {/* Bottom fade into card glass */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(11,18,16,0.6), transparent)',
              }}
            />
          </>
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ background: 'rgba(212,224,213,0.03)' }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.5 15.5L15.5 12.5M11.5 19.5L8.5 22.5C7.395 23.605 5.605 23.605 4.5 22.5C3.395 21.395 3.395 19.605 4.5 18.5L7.5 15.5M19.5 11.5L22.5 8.5C23.605 7.395 23.605 5.605 22.5 4.5C21.395 3.395 19.605 3.395 18.5 4.5L15.5 7.5"
                stroke="#7FA98F"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Domain label */}
        <span className="text-sage text-[0.6875rem] font-medium tracking-[0.05em] uppercase mb-2">
          {domain}
        </span>

        {/* Title */}
        <h3
          className="font-display text-cream leading-tight mb-2"
          style={{
            fontSize: '1.125rem',
            fontWeight: 500,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {link.title || 'Untitled'}
        </h3>

        {/* Description */}
        <p
          className="text-muted text-sm leading-relaxed mb-4 flex-grow"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {link.description || 'No description available.'}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(212,224,213,0.06)' }}
        >
          <span className="text-muted text-xs">{formattedDate}</span>

          <div className="flex items-center gap-1">
            {/* Open in new tab */}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-brass p-1.5 rounded-lg transition-colors duration-200"
              aria-label="Open link in new tab"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11 8.5v3a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 11.5v-6A1.5 1.5 0 0 1 3.5 4H6.5M9 2h4v4M6.5 8.5 13 2"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Delete */}
            <button
              onClick={() => {
                if (window.confirm('Delete this link preview?')) {
                  onDelete(link._id);
                }
              }}
              className="text-muted hover:text-brick p-1.5 rounded-lg transition-colors duration-200"
              aria-label="Delete link"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4h11M5 4V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V4m1.5 0v8.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 3.5 12.5V4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PreviewCard;
