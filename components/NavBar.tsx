'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isCandidates = pathname === '/candidates' || pathname?.startsWith('/candidate/');
  const isLeaderboard = pathname === '/leaderboard';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <button
          onClick={() => {
            router.push('/');
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2"
        >
          <span className="material-icons text-primary text-3xl">favorite</span>
          <span className="font-serif text-2xl font-bold tracking-tight">
            Valentine&apos;s <span className="text-primary">Queen</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/"
            className={isHome ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Home
          </Link>
          <Link
            href="/candidates"
            className={isCandidates ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Candidates
          </Link>
          <Link
            href="/leaderboard"
            className={isLeaderboard ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Leaderboard
          </Link>
          <button className="hover:text-primary transition-colors">Rules</button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              router.push('/admin');
              window.scrollTo(0, 0);
            }}
            className="px-6 py-2.5 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push('/candidates');
              window.scrollTo(0, 0);
            }}
            className="px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105"
          >
            Vote Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
