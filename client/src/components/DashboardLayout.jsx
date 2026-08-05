import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: GridIcon },
  ];

  const isActive = (path) => location.pathname === path;

  /* ── Shared sidebar content (DRY for desktop + mobile) ── */
  const SidebarContent = ({ onNavigate }) => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <ChainIcon size={24} />
        <span
          className="font-display text-lg text-cream tracking-tight"
          style={{ fontWeight: 500 }}
        >
          LinkLens
        </span>
      </div>

      {/* Nav */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                active ? 'text-cream' : 'text-muted hover:text-cream'
              }`}
              style={
                active
                  ? {
                      borderLeft: '3px solid #C9A15A',
                      background: 'rgba(201,161,90,0.06)',
                      marginLeft: -1,
                    }
                  : {}
              }
            >
              <item.icon active={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="pt-5"
        style={{ borderTop: '1px solid rgba(212,224,213,0.08)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-brass shrink-0"
            style={{
              background: 'rgba(201,161,90,0.12)',
              border: '1px solid rgba(201,161,90,0.2)',
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cream text-sm font-medium truncate">
              {user?.name}
            </p>
            <p className="text-muted text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-muted hover:text-cream text-sm transition-colors duration-200 flex items-center gap-2"
        >
          <SignOutIcon />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen relative">
      {/* ── Background layers ──────────────────────────────── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 70% 10%, #1C3B33 0%, transparent 50%)',
            'radial-gradient(ellipse 55% 45% at 15% 85%, #3E2723 0%, transparent 45%)',
            '#0B1210',
          ].join(', '),
        }}
      />

      <svg
        className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
        style={{ opacity: 0.025 }}
        aria-hidden="true"
      >
        <filter id="grain-d">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-d)" />
      </svg>

      <div
        className="fixed z-[1] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          top: '60%',
          right: '5%',
          width: 380,
          height: 280,
          background: '#C9A15A',
          opacity: 0.09,
          filter: 'blur(120px)',
        }}
      />
      <div
        className="fixed z-[1] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          top: '5%',
          left: '40%',
          width: 300,
          height: 220,
          background: '#7FA98F',
          opacity: 0.07,
          filter: 'blur(110px)',
        }}
      />

      {/* ── Desktop sidebar ────────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] z-30 flex-col glass-sidebar">
        <div className="p-6 flex-1 flex flex-col">
          <SidebarContent />
        </div>
      </aside>

      {/* ── Mobile header ──────────────────────────────────── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-30 glass-sidebar flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid rgba(212,224,213,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <ChainIcon size={20} />
          <span
            className="font-display text-base text-cream tracking-tight"
            style={{ fontWeight: 500 }}
          >
            LinkLens
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-muted hover:text-cream p-1.5 transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </header>

      {/* ── Mobile sidebar drawer ──────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 glass-overlay"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 w-[280px] glass-sidebar flex flex-col p-6 opacity-0 motion-safe:animate-auth-enter motion-reduce:opacity-100"
            style={{ background: 'rgba(11,18,16,0.85)' }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-muted hover:text-cream mb-6 transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Main content ───────────────────────────────────── */}
      <main className="relative z-10 lg:ml-[260px] min-h-screen pt-16 lg:pt-0">
        <div className="p-5 sm:p-8 lg:p-10 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* ── Inline SVG icons ───────────────────────────────────── */

const ChainIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path
      d="M12.5 15.5L15.5 12.5M11.5 19.5L8.5 22.5C7.395 23.605 5.605 23.605 4.5 22.5C3.395 21.395 3.395 19.605 4.5 18.5L7.5 15.5M19.5 11.5L22.5 8.5C23.605 7.395 23.605 5.605 22.5 4.5C21.395 3.395 19.605 3.395 18.5 4.5L15.5 7.5"
      stroke="#C9A15A" strokeWidth="1.5" strokeLinecap="round"
    />
  </svg>
);

const GridIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke={active ? '#C9A15A' : '#7FA98F'} strokeWidth="1.25" />
    <rect x="11" y="1.5" width="5.5" height="5.5" rx="1.5" stroke={active ? '#C9A15A' : '#7FA98F'} strokeWidth="1.25" />
    <rect x="1.5" y="11" width="5.5" height="5.5" rx="1.5" stroke={active ? '#C9A15A' : '#7FA98F'} strokeWidth="1.25" />
    <rect x="11" y="11" width="5.5" height="5.5" rx="1.5" stroke={active ? '#C9A15A' : '#7FA98F'} strokeWidth="1.25" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 14H3.333A1.333 1.333 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2H6M10.667 11.333L14 8l-3.333-3.333M14 8H6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default DashboardLayout;
