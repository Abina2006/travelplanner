
import React, { useState, useEffect } from 'react';
import { Trip, User } from './types';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import TripBuilder from './screens/TripBuilder';
import BudgetChart from './components/BudgetChart';
// Add Calendar as CalendarIcon to the lucide-react imports
import { Plane, LogIn, UserPlus, Plus, Sparkles, MapPin, Globe, Calendar as CalendarIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [isAuthMode, setIsAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('gt_user');
    const savedTrips = localStorage.getItem('gt_trips');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTrips) setTrips(JSON.parse(savedTrips));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('gt_user', JSON.stringify(user));
    if (trips.length > 0) localStorage.setItem('gt_trips', JSON.stringify(trips));
  }, [user, trips]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex.rivera@explorer.com',
      profilePic: 'https://i.pravatar.cc/150?u=alex',
      preferences: { language: 'EN', currency: 'USD' }
    };
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gt_user');
    setActiveTab('dashboard');
  };

  const createNewTrip = () => {
    const newTrip: Trip = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || '1',
      name: 'Dream Trip #' + (trips.length + 1),
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 604800000).toISOString().split('T')[0],
      description: 'A masterpiece of planning and adventure.',
      coverImage: `https://picsum.photos/seed/${Math.random()}/1200/800`,
      isPublic: false,
      stops: []
    };
    setTrips([newTrip, ...trips]);
    setSelectedTripId(newTrip.id);
    setActiveTab('trip-detail');
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black z-0"></div>
        <div className="absolute top-[-10%] left-[-10%] <div className=\"absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse\"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-4xl w-full grid lg:grid-cols-2 bg-white/5 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden relative z-10">
          {/* Brand Side */}
          <div className="hidden lg:flex flex-col justify-between p-16 bg-white/5 border-r border-white/5">
            <div>
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-950 shadow-xl mb-10">
                  <Plane size={36} className="rotate-45" />
               </div>
               <h1 className="text-6xl font-black text-white tracking-tighter leading-tight">Plan your <br/> next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">escape.</span></h1>
            </div>
            <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/60">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Globe size={18}/></div>
                    <p className="text-sm font-bold uppercase tracking-widest">Global Discovery Engine</p>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Sparkles size={18}/></div>
                    <p className="text-sm font-bold uppercase tracking-widest">AI Itinerary Mapping</p>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
                <div className="flex gap-4 p-1.5 bg-white/5 rounded-2xl border border-white/10 mb-8">
                    <button onClick={() => setIsAuthMode('login')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isAuthMode === 'login' ? 'bg-white text-indigo-950 shadow-xl' : 'text-white/40 hover:text-white'}`}>Login</button>
                    <button onClick={() => setIsAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isAuthMode === 'signup' ? 'bg-white text-indigo-950 shadow-xl' : 'text-white/40 hover:text-white'}`}>Join</button>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Welcome back.</h2>
                <p className="text-white/40 font-medium">Please enter your credentials to explore.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {isAuthMode === 'signup' && (
                <div>
                  <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-4 focus:ring-indigo-500/30 transition-all outline-none" required />
                </div>
              )}
              <div>
                <input type="email" placeholder="Email Address" defaultValue="traveler@example.com" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-4 focus:ring-indigo-500/30 transition-all outline-none" required />
              </div>
              <div>
                <input type="password" placeholder="Password" defaultValue="password" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-4 focus:ring-indigo-500/30 transition-all outline-none" required />
              </div>
              
              <button type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                {isAuthMode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isAuthMode === 'login' ? 'Get Started' : 'Join the Club'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const selectedTrip = trips.find(t => t.id === selectedTripId);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user} onLogout={handleLogout}>
      {activeTab === 'dashboard' && <Dashboard trips={trips} user={user} onNewTrip={createNewTrip} onViewTrip={(id) => { setSelectedTripId(id); setActiveTab('trip-detail'); }} />}
      
      {activeTab === 'trips' && (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-black text-indigo-950 tracking-tighter">Your Library</h1>
                <button onClick={createNewTrip} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 hover:scale-110 transition-all"><Plus size={32} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {trips.map(trip => (
                    <div key={trip.id} onClick={() => { setSelectedTripId(trip.id); setActiveTab('trip-detail'); }} className="group bg-white p-4 rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/50 cursor-pointer transition-all hover:-translate-y-2">
                        <div className="h-48 rounded-[1.8rem] overflow-hidden relative">
                            <img src={trip.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-6 text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">{trip.stops.length} Stops</p>
                                <h3 className="text-xl font-black tracking-tighter">{trip.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'trip-detail' && selectedTrip && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="relative">
              <button onClick={() => setActiveTab('dashboard')} className="text-indigo-400 hover:text-indigo-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">&larr;</div> Return Home
              </button>
              <h1 className="text-5xl lg:text-6xl font-black text-indigo-950 tracking-tighter leading-none mb-4">{selectedTrip.name}</h1>
              <div className="flex flex-wrap gap-4">
                  <span className="px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">{selectedTrip.stops.length} Cities planned</span>
                  <span className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">{selectedTrip.isPublic ? 'World-View' : 'Private Journal'}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-indigo-950 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl border border-indigo-50 hover:bg-indigo-50 transition-all">Share</button>
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-100 hover:scale-105 transition-all">Download Log</button>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-indigo-50/50 backdrop-blur rounded-[2rem] w-fit border border-indigo-50">
            {['Builder', 'Costs', 'Timeline'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(`trip-${tab.toLowerCase()}`)}
                className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === `trip-${tab.toLowerCase()}` || (activeTab === 'trip-detail' && tab === 'Builder')
                    ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100 scale-105'
                    : 'text-indigo-300 hover:text-indigo-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[600px]">
              {(activeTab.includes('builder') || activeTab === 'trip-detail') && <TripBuilder trip={selectedTrip} onUpdateTrip={updateTrip} />}
              {activeTab.includes('costs') && <BudgetChart stops={selectedTrip.stops} />}
              {activeTab.includes('timeline') && (
                  <div className="bg-white/50 border-4 border-dashed border-indigo-100 rounded-[4rem] p-40 text-center glass-panel">
                      <CalendarIcon size={64} className="mx-auto text-indigo-100 mb-6" />
                      <h2 className="text-2xl font-black text-indigo-950 tracking-tighter">Timeline Visualization</h2>
                      <p className="text-indigo-400 font-medium">Coming soon to your travel experience.</p>
                  </div>
              )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
