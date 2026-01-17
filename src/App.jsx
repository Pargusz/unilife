import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import GPACalculator from './features/GPACalculator';
import FocusTimer from './features/FocusTimer';
import TaskBoard from './features/TaskBoard';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'gpa': return <GPACalculator />;
      case 'focus': return <FocusTimer />;
      case 'tasks': return <TaskBoard />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-white overflow-hidden font-sans selection:bg-purple-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-20 md:ml-64 p-8 overflow-y-auto h-screen relative scroll-smooth">
        {/* Background glow effects */}
        <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed top-[40%] left-[-10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
