import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div className="min-h-screen selection:bg-primary/30 font-sans mesh-bg">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Responsive Margins: Padding-bottom on mobile to account for bottom nav */}
      <main className="md:ml-[24rem] transition-all duration-500 min-h-screen pb-32 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="layout-content"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
