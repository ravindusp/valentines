'use client';

import React, { useState } from 'react';
import { Candidate, VotingPower } from '../types';

interface GalleryProps {
  onNavigateToProfile: (id: string) => void;
  onCastVote: (id: string) => Promise<void>;
  activeVoteCandidateId?: string | null;
  votingPower: VotingPower;
  candidates: Candidate[];
}

const Gallery: React.FC<GalleryProps> = ({
  onNavigateToProfile,
  onCastVote,
  activeVoteCandidateId,
  votingPower,
  candidates,
}) => {
  const [filter, setFilter] = useState('All');
  const creditsRatio = votingPower.dailyLimit > 0 ? votingPower.remaining / votingPower.dailyLimit : 0;
  const creditProgressWidth = `${Math.max(0, Math.min(100, creditsRatio * 100))}%`;

  return (
    <div className="bg-bg-light min-h-screen font-sans flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-primary/5 p-6 hidden lg:flex flex-col gap-8 overflow-y-auto">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Search & Filters</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a nominee..." 
                className="w-full pl-10 pr-4 py-2 bg-bg-light border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              />
              <span className="material-icons absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
            </div>
          </section>

          <nav className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h3>
            <button onClick={() => setFilter('All')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${filter === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-primary/5'}`}>
              <span className="flex items-center gap-3"><span className="material-icons text-sm">grid_view</span> All Nominees</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${filter === 'All' ? 'bg-white/20' : 'bg-slate-100'}`}>{candidates.length}</span>
            </button>
             <button className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-primary/5 transition-all font-medium group">
              <span className="flex items-center gap-3 group-hover:text-primary transition-colors"><span className="material-icons text-sm">school</span> Seniors</span>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">12</span>
            </button>
            <button className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-primary/5 transition-all font-medium group">
              <span className="flex items-center gap-3 group-hover:text-primary transition-colors"><span className="material-icons text-sm">stars</span> Popular</span>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">08</span>
            </button>
             <button className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-primary/5 transition-all font-medium group">
              <span className="flex items-center gap-3 group-hover:text-primary transition-colors"><span className="material-icons text-sm">history</span> Past Winners</span>
            </button>
          </nav>

          <div className="mt-auto bg-primary/5 p-5 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="material-icons text-white">how_to_vote</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">Voting Power</p>
                <p className="text-lg font-black text-slate-900">{votingPower.remaining} Credits Left</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: creditProgressWidth }}></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 leading-tight italic">
              {votingPower.remaining > 0
                ? `Credits reset daily. You have used ${votingPower.used} of ${votingPower.dailyLimit} votes today.`
                : `You have used all ${votingPower.dailyLimit} daily votes. Credits reset every 24 hours.`}
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-pink-400 p-8 md:p-12 mb-8 text-white">
            <div className="relative z-10 max-w-2xl">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">2026 Annual Event</span>
              <h2 className="text-3xl md:text-5xl font-black mb-4">Choose Your <br/>Valentine's Queen</h2>
              <p className="text-pink-50 opacity-90 text-lg mb-8 leading-relaxed">
                The voting is officially open! Support the most inspiring members of our community. Every vote counts towards the crown.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-xl shadow-black/10 hover:bg-pink-50 transition-colors">View Leaderboard</button>
                <button className="bg-transparent border border-white/40 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">Voting Rules</button>
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] opacity-20 pointer-events-none">
              <span className="material-icons text-[24rem]">favorite</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm border border-slate-100 flex items-center gap-2 hover:border-primary/50 transition-all">
                <span className="material-icons text-sm">sort</span> Sort by: Most Recent
              </button>
              <button className="px-4 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm border border-slate-100 flex items-center gap-2 hover:border-primary/50 transition-all">
                <span className="material-icons text-sm">filter_list</span> All Departments
              </button>
            </div>
            <p className="text-sm text-slate-500 font-medium">Showing {candidates.length} candidates</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id} 
                onClick={() => onNavigateToProfile(candidate.id)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col cursor-pointer ${candidate.hasVoted ? 'border-2 border-primary' : 'border border-slate-100'}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={candidate.image} 
                    alt={candidate.name} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${candidate.hasVoted ? 'opacity-90' : ''}`}
                  />
                  
                  {candidate.isTrending && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-primary uppercase shadow-sm">Trending #1</span>
                    </div>
                  )}

                  {candidate.hasVoted && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-white/95 p-4 rounded-full shadow-2xl scale-125">
                        <span className="material-icons text-primary text-4xl">check_circle</span>
                      </div>
                    </div>
                  )}

                  {!candidate.hasVoted && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white text-xs leading-relaxed italic">"Spreading love and kindness through community service every day."</p>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{candidate.name}</h3>
                      <p className="text-xs font-medium text-slate-400 uppercase">{candidate.role} • {candidate.department}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${candidate.hasVoted ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      {candidate.hasVoted ? 'Voted' : `${(candidate.votes / 1000).toFixed(1)}k Votes`}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed">
                    {candidate.hasVoted && candidate.hasVotedAt
                      ? `You voted for ${candidate.name.split(' ')[0]} on ${new Date(candidate.hasVotedAt).toLocaleDateString()}.`
                      : candidate.description}
                  </p>

                  <button
                    onClick={async (event) => {
                      event.stopPropagation();
                      if (candidate.hasVoted || votingPower.remaining <= 0) {
                        return;
                      }
                      await onCastVote(candidate.id);
                    }}
                    disabled={
                      !!candidate.hasVoted ||
                      votingPower.remaining <= 0 ||
                      activeVoteCandidateId === candidate.id
                    }
                    className={`mt-auto w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      candidate.hasVoted || votingPower.remaining <= 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95'
                    }`}
                  >
                     {candidate.hasVoted
                       ? 'Vote Cast'
                       : votingPower.remaining <= 0
                        ? 'No Credits Left'
                       : activeVoteCandidateId === candidate.id
                        ? 'Casting...'
                        : <><span className="material-icons text-sm">favorite</span> Cast Vote</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gallery;
