import React from 'react';
import { Candidate } from '../types';

interface ProfileProps {
  candidate: Candidate;
}

const Profile: React.FC<ProfileProps> = ({ candidate }) => {
  return (
    <div className="bg-bg-light min-h-screen font-sans">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl mb-8 group">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeg0FkGEBj1uB8GW90xYlMaobuvz9Zs1EMGK5kIs8H67VciQnpvmRux3h5tvEl4hH0QVB48dzTJSQtKIMtHaYuZmN0MLhVzCkAXEzsiR73OZGySdf-6dCIhOxePREzOoZ1xN2zoKUkMoxlOivxaWyUOpNQDuml-9J7WDcXR1b-sQp1QBmMZaXu4lIxL3tuRt-l8VImgjrzdHoMrw462Dy0SNXQ7wllAW0gdn_jexA8QeoPdONveL1rksq9kQRx6yYBOyuDMyCYXKr7" 
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end justify-between">
            <div className="flex items-end gap-6">
              <div className="relative group">
                <div className="w-40 h-40 rounded-xl border-4 border-white overflow-hidden shadow-xl bg-white">
                  <img src={candidate.image} className="w-full h-full object-cover" alt="Profile" />
                </div>
                <div className="absolute -top-3 -right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="material-icons text-sm">verified</span>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-4xl font-extrabold text-white mb-1">{candidate.name}</h1>
                <p className="text-white/80 font-medium flex items-center gap-2">
                  <span className="material-icons text-sm">location_on</span> Paris, France • 24 years old
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mb-4 mt-4 md:mt-0">
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                <span className="material-icons">share</span> Share
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/40">
                <span className="material-icons">favorite</span> Cast Vote
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm text-center">
                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Current Rank</p>
                <p className="text-2xl font-black">#{candidate.rank || '05'}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm text-center">
                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Total Votes</p>
                <p className="text-2xl font-black">{candidate.votes.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm text-center">
                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Supporters</p>
                <p className="text-2xl font-black">8.9K</p>
              </div>
            </div>

            {/* Biography */}
            <section className="bg-white p-8 rounded-xl border border-primary/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Valentine's Manifesto
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Hi everyone! I'm {candidate.name.split(' ')[0]}, and I believe that love isn't just a feeling, but a continuous act of kindness. My journey in this community has always been about fostering genuine connections and supporting one another through every season of life.</p>
                <p>As your Valentine's Queen nominee, I'm committed to launching the "Kind Hearts Initiative," a project aimed at providing mental health resources and mentorship for young women in our digital space. I've been part of this community for 3 years, and seeing the growth we've achieved together is what drives me to represent you.</p>
                <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl italic font-medium text-slate-800 my-6">
                  "Love is the only language that can be heard by the deaf and seen by the blind. Let's make this February a testament to our collective kindness."
                </blockquote>
              </div>
            </section>

            {/* Gallery Preview */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Moments & Memories</h2>
                <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">View All <span className="material-icons text-sm">chevron_right</span></button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqqm5iR5i6aj2AeNqktY7Yxr0JU7qC0_MzUzI0EcjKCYuW8SuDXSZGxitwp9KZYsEVwlJjz0ANx9PEsRk08f4emMyo_0gRc7bBmdkoZUPUHvLlayEvYFOpbXBKIKMIbwqd5CUoBJfzB2pco-jlRLqAJM4u6a6jimw2gokJqe6GbKbUTzJFX9w5KIRuardEJXgkVL0xCbcPR-Hw84XDuxVluCYLKwO7rrLKvWnLiuTNPU1LyJJGV-eKkeHg0h8lVxWcKXT_AjiT-Te9" className="w-full h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform" alt="Gallery 1" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArOdvdB_-kb97SA3yfdSCmGKJrwbd1cDT0WYstR029ym-OcUGTYQG5QgCzt7cbt_WNr8e7PuN-9-nphB0FT7qM-8tYOV_kUevShh7H7PWIzxoBEpnRxf3Au0UY5pHwL7KeiaimO4jo2GNSbfT8i4QRbrqxxF-kJJS-_MrrP733sa4b2onnAwGombjWygGwndbNWYNMRX2J6fnut_oPi2L9a2Zz8PS4lFrGypyzRWLdbZz8iy4M_QoGQ6crvxr8xiiwrwcLtdEErY6x" className="w-full h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform" alt="Gallery 2" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiZjDFCaVr44edJ9nWtgPlJN8rMuMeli5W2EHyrJbSyzFkSO9v6xeYECgUUKlWj4Mcvi3gOKHeEA755g2v7N1hE8PD8fjOflQwWHQWuT-PPDu-naVaWLMf10vxnZsTb0gbAmeLKQ4o7XQXJrM9W4TyiU3rJfXQQu5K0IG4KL_urXj8e7UsKl36wVcC4MmQB02KhBHs96-W4QsrEKkAgan53LoNbmyxX5yZmhkqdjAqs9bc1psvPz2st-PoAq8oRw6fs2xVOgHxJRPt" className="w-full h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform" alt="Gallery 3" />
                <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTnXcIWen9VUjwhucUGv-Lw-hCHyP-YHkqyWdOcWONF1gvWaI9x0QZY-AocJqZ-ZTGFmtzUtEYZOgL3dkPWspQ2zjHkRYlzIUOQveodJyYBFVTq06CUWw8l12-i6GKBVk1v2RN2hOa1Z6P1_hVt8cAikzAg7KNRw0wpcaU001FDyshRwW96OpnjYoLsz_ZEMTISnC4UCXQS19_qiIiA9QcQUdBLdoXV7s_t4FASN5xoWOJVoFkwmRf-57s3_BXRK3GXDgGxlZHZ3JI" className="w-full h-32 object-cover" alt="Gallery 4" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg group-hover:bg-black/60 transition-colors">+12</div>
                </div>
              </div>
            </section>

            {/* Comments Section */}
            <section className="bg-white p-8 rounded-xl border border-primary/10 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Supporter Comments <span className="text-primary/60 text-lg font-medium">(248)</span></h2>
                <div className="flex bg-bg-light p-1 rounded-lg">
                  <button className="px-4 py-1.5 bg-white rounded-md text-sm font-bold shadow-sm">Hot</button>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-500">New</button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-primary">person</span>
                </div>
                <div className="flex-1">
                  <textarea className="w-full border-primary/10 bg-bg-light rounded-xl p-4 focus:ring-primary focus:border-primary transition-all resize-none outline-none" placeholder="Leave a message of support..." rows={3}></textarea>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-icons text-xl">sentiment_satisfied_alt</span></button>
                       <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-icons text-xl">image</span></button>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-all">Post Support</button>
                  </div>
                </div>
              </div>

              <div className="space-y-8 mt-10">
                {[
                  { name: 'Marcus Chen', time: '2 mins ago', text: `Sophia has been a pillar of this community since day one. Her dedication to the Kind Hearts Initiative is exactly why she deserves the crown! 💖`, likes: 42, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-eSzgo7ah5aME9-4p79t-A4J0Yp65jUCtDov_fYvxpZXrtmF-8yASnop4WjBBaVLqXTVHYdbwUI5xwh1EkWLcdMRkmWQ48N2toX0gPjsKyCcVKzhX5DF6JdkdByKptt9qJLfX_TOxVvMlR4D--d06Pn7yeHtBk79H82LULe4g2tz-OA7iD3CcY1045a_5WyyBB9VDjyFAIxOpUcs7clfI9rmE0b5k2oRrGitDlayDLeL8SVtWDGUes4Q--mPUorTxe4_lXJns1s8g" },
                  { name: 'Elena Rodriguez', time: '15 mins ago', text: 'Absolutely stunning inside and out. You have my 10 daily votes!', likes: 18, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkVrqPdtUNWUxDeV3juvKhGETYFAurS5R0Rng4dxltaIqnz70BfP6Vopfw7_Cli4tYiXvNi9tRPwdY19i-3d3O4LhY3qnCb9xvBkjRbSk4KE5rLyacaa66Wj9aq-GRpPyCp-wW9NluRGqnGpRBUnB5fO47_y1BoAQ0yjCp4obUEDwT3GHLHd1fZsqs-tejK8_DuxUR8VPp1Zsg0dUGhoAuBvdm3jQTgTzAm6OZODq9iPu1uHC43qwNc0Ivuf1Kf2lTsLqH1v36YMSQ" },
                ].map((comment, i) => (
                  <div key={i} className="flex gap-4">
                    <img src={comment.avatar} className="w-12 h-12 rounded-full object-cover" alt={comment.name} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{comment.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{comment.time}</span>
                      </div>
                      <p className="text-slate-600">{comment.text}</p>
                      <div className="flex gap-6 mt-3">
                        <button className="flex items-center gap-1.5 text-sm font-bold text-primary">
                          <span className="material-icons text-sm">favorite</span> {comment.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                          <span className="material-icons text-sm">reply</span> Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-lg sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Live Competition</h3>
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold">{candidate.name}</span>
                    <span className="text-sm font-bold text-primary">{candidate.votes.toLocaleString()}</span>
                  </div>
                  <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">82% of current leader's votes</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-primary/5">
                  <p className="text-xs font-bold text-slate-400 uppercase">Top 3 Standings</p>
                  {[
                    { name: 'Bella Thorne', votes: '15.2k', rank: '01', color: 'text-slate-400', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYTr6Hdpyq0xLdT9KsNoRLrN5tmeVq9804gRYwpLUvLU6tWz2hP6MWK3HXGtkaM8MSFqEMJ3Bf96cFRN2Pq_m0S5vh15A1egyeGH-drpU2k6rOeRAnV0QWWK7AvOeg42crSkBmELwu7e-NxCli-PdPilr_twMq-jddHVtPvu7s6Tm1E19Z89YIi3lag92WuAe-u_y4HJQosfOJR9IgmzTwZCEm78v48SIVtG7XZv6f-mFcc98rBdzFVzx_9DHesCA1_GDwTsJb-hza" },
                    { name: 'Sophia Rose', votes: '12.5k', rank: '02', color: 'text-primary', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwZQ3xCEZ8adXYIBpY3fIlf0QaBNucPX3siLYLxBnp5eeAte8PPpZDwMVqMmCVoCHqcKo5bN37PegO6ZW3biF5YaO5ZphRj72aHGmgveNFpBQFaIxNffquQ4cT75juIV6HDoK9ytuWSmUAEpyXRCGYBm8VPYkrvTRxIxKvIRSMCLjZ0EvbBUgK3oohiNHp2I-s6X50tXEOyRxbQ-sDUKrbgZ0XG8ekw59NT8-TtzDDdFwUXS094VlDo4tmFKs26fI_sQ1tWv26cDr" },
                    { name: 'Grace Liu', votes: '11.8k', rank: '03', color: 'text-slate-400', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJPSytcx2aabmZQ3g8KPnUM3EWw2LtYkTO_fDxhD3IpZil3u1wRMe0reMQkEVzwFOqEhDTy8yUk9-Pxs4kO9auxGWRezTo_XEB0-_DHcN-Ulue4Teg0uAKLFOsKv23CfKMiuTRCHLwhyeDMt9Xo5iec73P7L2eKto_77H4j_2KNrsN1n4Vrc-K8JTo3Ow86A_0LaN4G_Q2DK3TFBS_I09RfMC6nWNWQIbtYWmbUEDWqcvZrhG99ml1CDiotzBA3QBvxzKaXXC5wITL" }
                  ].map(leader => (
                    <div key={leader.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className={`text-xs font-bold ${leader.color}`}>{leader.rank}</span>
                         <img src={leader.img} className={`w-8 h-8 rounded-full object-cover ${leader.name === 'Sophia Rose' ? 'border border-primary' : ''}`} alt={leader.name} />
                         <span className={`text-sm font-medium ${leader.name === 'Sophia Rose' ? 'text-primary font-bold' : ''}`}>{leader.name}</span>
                      </div>
                      <span className={`text-xs font-bold ${leader.name === 'Sophia Rose' ? 'text-primary' : ''}`}>{leader.votes}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/40 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                   <span className="material-icons">how_to_reg</span> VOTE NOW
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span className="material-icons text-xs">timer</span>
                  <span>Voting ends in: 04d : 12h : 35m</span>
                </div>
              </div>
            </div>

            {/* Badges */}
             <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold mb-4 text-sm flex items-center gap-2">
                   <span className="material-icons text-primary text-sm">stars</span> Top Contributors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
                  ))}
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">+8k</div>
                </div>
                 <p className="text-xs text-slate-500 mt-4 leading-snug">Help {candidate.name.split(' ')[0]} reach the top by sharing her profile with your friends!</p>
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
