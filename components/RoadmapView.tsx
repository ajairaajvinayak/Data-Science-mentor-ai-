import React, { useState } from 'react';
import { ROADMAP_DATA } from '../constants';
import { Phase, WeekPlan } from '../types';

export const RoadmapView: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(taskId)) newSet.delete(taskId);
    else newSet.add(taskId);
    setCompletedTasks(newSet);
  };

  const currentPhase = ROADMAP_DATA.find(p => p.id === activePhase);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Your 90-Day Master Plan</h2>
        <p className="text-slate-600">From zero to job-ready Data Scientist.</p>
      </div>

      {/* Phase Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ROADMAP_DATA.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left group ${
              activePhase === phase.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">{phase.duration}</div>
            <div className={`font-bold text-lg mb-2 ${activePhase === phase.id ? 'text-blue-700' : 'text-slate-800'}`}>{phase.title}</div>
            <div className="text-xs text-slate-500 line-clamp-2">{phase.focus}</div>
          </button>
        ))}
      </div>

      {/* Active Phase Content */}
      {currentPhase && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 p-6 border-b border-slate-200">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{currentPhase.title}</h3>
                  <p className="text-slate-600 mt-1">{currentPhase.focus}</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                   <span>Income Goal: {currentPhase.incomeOpportunity}</span>
                </div>
             </div>
          </div>

          <div className="p-6 space-y-8">
            {currentPhase.weeks.map((week, idx) => (
              <div key={week.week} className="relative pl-8 border-l-2 border-slate-200 last:border-0 pb-8 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">Week {week.week}: {week.theme}</h4>
                <p className="text-slate-600 text-sm mb-4">{week.description}</p>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tasks</h5>
                  <div className="space-y-2">
                    {week.tasks.map((task, tIdx) => {
                      const taskId = `p${currentPhase.id}-w${week.week}-t${tIdx}`;
                      const isDone = completedTasks.has(taskId);
                      return (
                        <div key={taskId} className="flex items-start">
                          <button
                            onClick={() => toggleTask(taskId)}
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isDone ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300 hover:border-blue-400'
                            }`}
                          >
                            {isDone && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </button>
                          <span className={`ml-3 text-sm ${isDone ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                   <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Mini Project</h5>
                   <p className="text-indigo-900 text-sm font-medium">{week.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
