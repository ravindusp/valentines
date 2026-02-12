'use client';

import React, { useEffect, useState } from 'react';
import { Candidate } from '../types';

interface HomeProps {
  onNavigateToGallery: () => void;
  onNavigateToProfile: (id: string) => void;
  candidates: Candidate[];
}

const TARGET_DATE_SRI_LANKA = new Date('2026-02-13T23:59:00+05:30').getTime();

const getCountdownParts = () => {
  const diffMs = Math.max(0, TARGET_DATE_SRI_LANKA - Date.now());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Mins', value: String(mins).padStart(2, '0') },
    { label: 'Secs', value: String(secs).padStart(2, '0') },
  ];
};

const Home: React.FC<HomeProps> = ({ onNavigateToGallery, onNavigateToProfile, candidates }) => {
  const [countdown, setCountdown] = useState(getCountdownParts);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-bg-light dark:bg-bg-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6 bg-[radial-gradient(circle_at_top_right,#fff1f5_0%,#f8f6f6_100%)]">
        {/* Abstract Decorations */}
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-pulse">
              <span className="material-icons text-sm">auto_awesome</span>
              2026 CROWNING EVENT
            </span>
            <h1 className="font-serif text-6xl lg:text-8xl leading-tight mb-8">
              Who will be <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">the Queen?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mb-10 leading-relaxed">
              Cast your vote and help us crown this year's Valentine's Queen. Celebrate beauty, grace, and community spirit.
            </p>
            
            {/* Countdown Timer */}
            <div className="flex gap-4 mb-10">
              {countdown.map((item) => (
                <div key={item.label} className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white shadow-xl shadow-primary/5 rounded-2xl border border-primary/10">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{item.value}</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onNavigateToGallery} className="px-10 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-hover hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                Cast Your Vote
              </button>
              <button className="px-10 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <span className="material-icons">play_circle</span>
                How it Works
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square relative z-10 overflow-hidden rounded-[40px] shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPfNQT0uquLGJgTZdUHqKeQd-3BhRcHb8p73rbFm0uJmGvgWYGekAxYkVYU7u_MuT2Agv7VjRdVVHxuo5nVyBgP3Fc1xBvQj48zGi5q2rQo0HR-fUfrtDRaMHQZ615xJ0-Exfk3Vehd_rtVTiCB7gAiYPt2cY674UZBjVdyzbRolj4g83tZjTriGcleOxqMNVSY7bfmqp5sr0i2wapTJL2PluCb6_ZpTtoLdFdXXCAIj-9HKXnGgtXXKA0JShZl2QzzLkTforT_hMb" 
                alt="Valentine's Queen"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary">emoji_events</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Current Leader</div>
                <div className="text-xs text-slate-500">Sophia Williams • 12.4k Votes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <div className="bg-white py-6 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="material-icons text-primary">group</span> 5.2k People Voting Now</span>
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="material-icons text-primary">verified</span> Official Platform</span>
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="material-icons text-primary">card_membership</span> Premium Rewards</span>
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="material-icons text-primary">stars</span> Verified Results</span>
          </div>
        </div>
      </div>

      {/* Top Candidates Section */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        id="candidates"
        style={{
          backgroundImage: "url('/Hearts_background_3d_2k_202602121131.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl text-white mb-4">Meet the <span className="text-primary italic">Candidates</span></h2>
            <p className="text-slate-200 max-w-2xl mx-auto">Leading the polls this season. Discover their stories and choose your favorite Valentine's representative.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="group flex flex-col items-center cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-white/70 shadow-xl shadow-black/10"
                onClick={() => onNavigateToProfile(candidate.id)}
              >
                <div className="relative w-56 h-56 mb-6">
                  <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-primary rounded-full group-hover:rotate-180 transition-all duration-700"></div>
                  <div className="p-4 w-full h-full">
                    <img 
                      className="w-full h-full object-cover rounded-full shadow-lg" 
                      src={candidate.image} 
                      alt={candidate.name}
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <span className="material-icons text-sm">favorite</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-slate-900 mb-1">{candidate.name}</h3>
                <p className="text-slate-600 text-sm mb-4 uppercase tracking-tighter">{candidate.votes.toLocaleString()} Votes</p>
                <button className="px-8 py-2 rounded-full border border-primary text-primary font-bold bg-white/80 hover:bg-primary hover:text-white transition-all">
                  Vote for {candidate.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button onClick={onNavigateToGallery} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-primary/10 hover:text-primary transition-all shadow-lg shadow-black/10">
              View All 50 Candidates <span className="material-icons">east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Community Feed Preview */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-serif text-5xl mb-4">Live Community <span className="text-primary italic">Feed</span></h2>
              <p className="text-slate-500">Real-time voting activity from around the world.</p>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Mark S.', time: '2 mins ago', text: "Just cast my vote for Sarah! Her community service record is truly impressive. Go Sarah! ❤️", target: 'Sarah' },
              { name: 'Elena R.', time: '5 mins ago', text: "Bella's vision for the youth program is exactly what we need right now. All my support to her!", target: 'Bella' },
              { name: 'Jasmine K.', time: '8 mins ago', text: "Voting every day! It's so exciting to see the leaderboard changing constantly. Good luck girls!", target: 'General' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-bg-light rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.time}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">"{item.text}"</p>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold w-fit">
                  <span className="material-icons text-[14px]">how_to_reg</span> 
                  {item.target === 'General' ? 'Regular Voter' : `Voted for ${item.target}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
             <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtASUGeuHxupQ8YdizO0dhnGMBpODFuHPTsaRgYCrjb3SzvwwOtZCMwWfVcObR2NZxZFuv7QO409HkIx4E-2ZXxVlFICvQbU5LyrM91q41vg7o87DYmnDhkvW5Vo1w5jCXWXgvGO0lf6sxho4oKBwhgXm-7WIpMwCfWq40hdKgfSOhndXtA05JAfHbJidFc-c0k-T3sBYHt7eGUg2uCovaCQNoykbrJR2ddyQi2z0hHczqLMXNkOsBoyLNK2pr6FXBm-dO-R8YFsm5" alt="Background" />
          </div>
          <div className="relative z-10 py-20 px-12 text-center flex flex-col items-center">
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">Ready to crown <br />your Queen?</h2>
            <p className="text-slate-300 max-w-xl mb-12 text-lg">Don't let your favorite candidate miss out. Every vote counts towards the big reveal on February 14th.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={onNavigateToGallery} className="px-12 py-5 bg-primary text-white font-bold text-xl rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-primary/40">
                Join the Movement
              </button>
              <button className="px-12 py-5 bg-white/10 text-white backdrop-blur-md font-bold text-xl rounded-2xl hover:bg-white/20 transition-all">
                Nominate Someone
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-icons text-primary text-3xl">favorite</span>
                <span className="font-serif text-2xl font-bold tracking-tight">Valentine's <span className="text-primary">Queen</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8">
                The world's leading community-driven platform celebrating grace, beauty, and impact through our annual Valentine's Crowning event.
              </p>
              <div className="flex gap-4">
                {['facebook', 'alternate_email', 'share'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <span className="material-icons text-sm">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">Quick Links</h4>
              <ul className="space-y-4">
                {['Candidate Login', 'Leaderboard', 'Voting Rules', 'Past Winners'].map(link => (
                  <li key={link}><a href="#" className="text-slate-600 hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQ'].map(link => (
                   <li key={link}><a href="#" className="text-slate-600 hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2026 Valentine's Queen Official. All rights reserved.</p>
            <p>Designed for the community with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
