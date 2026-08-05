import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import LinkForm from '../components/LinkForm';
import PreviewCard from '../components/PreviewCard';

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await api.get('/links');
      setLinks(res.data.links);
    } catch (err) {
      setError('Failed to load your links.');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAdded = (newLink) => {
    setLinks((prev) => [newLink, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/links/${id}`);
      setLinks((prev) => prev.filter((l) => l._id !== id));
    } catch {
      setError('Failed to delete link.');
    }
  };

  return (
    <>
      {/* ── Page header ────────────────────────────────────── */}
      <div className="mb-10 opacity-0 motion-safe:animate-card-enter motion-reduce:opacity-100">
        <h1
          className="font-display text-cream tracking-tight mb-2"
          style={{ fontSize: '2rem', lineHeight: 1.15 }}
        >
          Your link previews
        </h1>
        <p className="text-muted text-sm">
          {loading
            ? 'Loading your collection…'
            : `${links.length} link${links.length !== 1 ? 's' : ''} in your collection`}
        </p>
      </div>

      {/* ── Add link form ──────────────────────────────────── */}
      <div
        className="opacity-0 motion-safe:animate-card-enter motion-reduce:opacity-100"
        style={{ animationDelay: '60ms' }}
      >
        <LinkForm onLinkAdded={handleLinkAdded} />
      </div>

      {/* ── Error banner ───────────────────────────────────── */}
      {error && (
        <div
          className="glass p-4 mb-8 motion-safe:animate-fade-in"
          style={{ borderLeft: '3px solid #C1554A' }}
        >
          <p className="text-brick text-sm">{error}</p>
        </div>
      )}

      {/* ── Content ────────────────────────────────────────── */}
      {loading ? (
        /* Skeleton grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass overflow-hidden">
              <div className="h-44 skeleton" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 skeleton" />
                <div className="h-5 w-3/4 skeleton" />
                <div className="h-3 w-full skeleton" />
                <div className="h-3 w-5/6 skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : links.length === 0 ? (
        /* ── Empty state (editorial) ───────────────────────── */
        <div className="glass p-16 text-center flex flex-col items-center opacity-0 motion-safe:animate-card-enter motion-reduce:opacity-100">
          {/* Minimal browser-window line art */}
          <svg
            width="80"
            height="56"
            viewBox="0 0 80 56"
            fill="none"
            className="mb-8"
            aria-hidden="true"
            style={{ opacity: 0.45 }}
          >
            <rect
              x="0.5"
              y="0.5"
              width="79"
              height="55"
              rx="6"
              stroke="rgba(212,224,213,0.2)"
            />
            <line
              x1="0"
              y1="14"
              x2="80"
              y2="14"
              stroke="rgba(212,224,213,0.12)"
            />
            {/* Traffic-light dots */}
            <circle cx="8" cy="7" r="2" fill="rgba(193,85,74,0.5)" />
            <circle cx="15" cy="7" r="2" fill="rgba(201,161,90,0.5)" />
            <circle cx="22" cy="7" r="2" fill="rgba(127,169,143,0.5)" />
            {/* Content placeholders */}
            <rect
              x="8"
              y="22"
              width="28"
              height="3"
              rx="1.5"
              fill="rgba(201,161,90,0.2)"
            />
            <rect
              x="8"
              y="30"
              width="50"
              height="2"
              rx="1"
              fill="rgba(212,224,213,0.08)"
            />
            <rect
              x="8"
              y="36"
              width="42"
              height="2"
              rx="1"
              fill="rgba(212,224,213,0.06)"
            />
            <rect
              x="8"
              y="44"
              width="20"
              height="5"
              rx="2.5"
              fill="rgba(127,169,143,0.12)"
            />
          </svg>

          <h3
            className="font-display text-cream text-xl mb-2"
            style={{ fontWeight: 500 }}
          >
            Your collection is empty
          </h3>
          <p className="text-muted text-sm max-w-sm">
            Paste a URL above to save your first link preview. We&rsquo;ll
            fetch the title, description, and image automatically.
          </p>
        </div>
      ) : (
        /* ── Link grid ─────────────────────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <PreviewCard
              key={link._id}
              link={link}
              onDelete={handleDelete}
              style={{ animationDelay: `${(index + 2) * 60}ms` }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
