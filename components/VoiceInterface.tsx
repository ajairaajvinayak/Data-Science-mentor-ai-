import React, { useState, useEffect, useRef } from 'react';
import { LiveClient } from '../services/geminiService';

export const VoiceInterface: React.FC = () => {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [audioLevel, setAudioLevel] = useState(0);
  const liveClientRef = useRef<LiveClient | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (liveClientRef.current) {
        liveClientRef.current.disconnect();
      }
    };
  }, []);

  const toggleConnection = () => {
    if (status === 'connected') {
      liveClientRef.current?.disconnect();
    } else {
      setStatus('connecting');
      const client = new LiveClient(
        (level) => setAudioLevel(level),
        (newStatus) => setStatus(newStatus)
      );
      liveClientRef.current = client;
      client.connect();
    }
  };

  // Visualizer scale
  const scale = Math.min(1 + audioLevel * 5, 2.5);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] max-w-2xl mx-auto text-center px-4">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Voice Coaching Session</h2>
        <p className="text-slate-600">Prepare for interviews or discuss complex topics hands-free.</p>
      </div>

      <div className="relative mb-12 group">
        {/* Ripples */}
        {status === 'connected' && (
           <>
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
           </>
        )}
        
        {/* Main Circle */}
        <button
          onClick={toggleConnection}
          disabled={status === 'connecting'}
          className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            status === 'connected' 
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
              : status === 'error'
              ? 'bg-red-50 text-red-500 border-2 border-red-200'
              : 'bg-white text-slate-800 border-4 border-slate-100 hover:border-blue-100'
          }`}
          style={{ transform: status === 'connected' ? `scale(${scale})` : 'scale(1)' }}
        >
           {status === 'connecting' ? (
             <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
           ) : status === 'connected' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
           ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
           )}
        </button>
      </div>

      <div className="h-8">
        {status === 'connected' && (
          <span className="text-blue-600 font-semibold animate-pulse">Listening...</span>
        )}
        {status === 'error' && (
          <span className="text-red-500 font-medium">Connection failed. Please check your mic permissions and try again.</span>
        )}
        {status === 'disconnected' && (
          <span className="text-slate-400 font-medium">Tap to start speaking</span>
        )}
      </div>
    </div>
  );
};
