'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { fetchCandidates } from '@/lib/client/api';
import { Candidate } from '@/types';

const REFRESH_INTERVAL_MS = 15_000;

const formatVotes = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export default function LeaderboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  const loadLeaderboard = async (silent = false) => {
    try {
      const payload = await fetchCandidates();
      setCandidates(payload.candidates);
      setLastUpdatedAt(new Date());
      if (!silent) {
        setErrorMessage('');
      }
    } catch (error) {
      if (!silent) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load leaderboard.');
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void loadLeaderboard();

    const intervalId = window.setInterval(() => {
      void loadLeaderboard(true);
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const rankedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => b.votes - a.votes);
  }, [candidates]);

  const winner = rankedCandidates[0];
  const runnerUp = rankedCandidates[1];
  const voteLead = winner ? winner.votes - (runnerUp?.votes || 0) : 0;

  return (
    <div className="bg-bg-light min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary p-8 md:p-12 text-white">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70 mb-3">Live Rankings</p>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">Leaderboard</h1>
            <p className="max-w-2xl text-white/85 text-base md:text-lg">
              Standings update every 15 seconds based on real vote totals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/candidates"
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
              >
                Go Vote
              </Link>
              {lastUpdatedAt && (
                <span className="px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-sm">
                  Last update: {lastUpdatedAt.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 opacity-20 pointer-events-none">
            <span className="material-icons text-[16rem]">emoji_events</span>
          </div>
        </section>

        {errorMessage && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="bg-white rounded-3xl border border-primary/10 p-10 text-slate-500">
            Loading leaderboard...
          </div>
        ) : rankedCandidates.length === 0 ? (
          <div className="bg-white rounded-3xl border border-primary/10 p-10 text-slate-500">
            No candidates available yet.
          </div>
        ) : (
          <>
            {winner && (
              <section className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Currently Winning</p>
                <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={winner.image}
                      alt={winner.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-primary/20"
                    />
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{winner.name}</h2>
                      <p className="text-slate-500">
                        {winner.role} • {winner.department}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 min-w-[240px]">
                    <div className="rounded-xl border border-slate-200 px-4 py-3">
                      <p className="text-xs uppercase text-slate-400 tracking-wide">Votes</p>
                      <p className="text-xl font-black text-slate-900">{formatVotes(winner.votes)}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 px-4 py-3">
                      <p className="text-xs uppercase text-slate-400 tracking-wide">Lead</p>
                      <p className="text-xl font-black text-primary">{formatVotes(voteLead)}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="bg-white border border-primary/10 rounded-3xl p-4 md:p-6 shadow-soft overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-3">Candidate</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3">Votes</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedCandidates.map((candidate, index) => {
                    const isWinner = index === 0;
                    const isRunnerUp = index === 1;
                    const statusLabel = isWinner ? 'Leading' : isRunnerUp ? 'Chasing' : 'Contender';

                    return (
                      <tr key={candidate.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold ${
                              isWinner
                                ? 'bg-primary text-white'
                                : isRunnerUp
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <Link
                            href={`/candidate/${candidate.id}`}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-semibold text-slate-900">{candidate.name}</p>
                              <p className="text-xs text-slate-500">{candidate.role}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-3 text-slate-600">{candidate.department}</td>
                        <td className="py-4 px-3 font-bold text-slate-900">
                          {formatVotes(candidate.votes)}
                        </td>
                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              isWinner
                                ? 'bg-primary/10 text-primary'
                                : isRunnerUp
                                  ? 'bg-slate-100 text-slate-700'
                                  : 'bg-slate-50 text-slate-500'
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
