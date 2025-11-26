import React, { useState } from 'react';
import { AppView } from './types';
import { RoadmapView } from './components/RoadmapView';
import { ChatInterface } from './components/ChatInterface';
import { VoiceInterface } from './components/VoiceInterface';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ROADMAP);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
               M
             </div>
             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
               DataScience<span className="font-light">Mentor</span>
             </h1>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView(AppView.ROADMAP)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === AppView.ROADMAP
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setCurrentView(AppView.CHAT)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === AppView.CHAT
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Mentor Chat
            </button>
            <button
              onClick={() => setCurrentView(AppView.VOICE)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                currentView === AppView.VOICE
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="relative flex h-2 w-2 mr-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Live Coach
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {currentView === AppView.ROADMAP && <RoadmapView />}
        {currentView === AppView.CHAT && <ChatInterface />}
        {currentView === AppView.VOICE && <VoiceInterface />}
      </main>
      
      {/* Footer Info */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>Powered by Google Gemini 2.5 Live API & Gemini 3 Pro</p>
      </footer>
    </div>
  );
};

export default App;
