import React from 'react';
import { LayoutDashboard, Calculator, Timer, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Panel' },
    { id: 'gpa', icon: Calculator, label: 'Ortalama' },
    { id: 'focus', icon: Timer, label: 'Odak Modu' },
    { id: 'tasks', icon: ListTodo, label: 'Görevler' },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-20 md:w-64 glass-panel m-0 rounded-l-none border-l-0 z-50 flex flex-col justify-between py-8"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 hidden md:block" style={{ backgroundImage: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          UniLife
        </h1>
        <div className="w-10 h-10 md:hidden mb-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />

        <nav className="w-full flex flex-col gap-4 px-2 md:px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 w-full group relative overflow-hidden ${isActive ? 'bg-white/10 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl"
                  />
                )}
                <Icon size={24} className={isActive ? 'text-cyan-400' : ''} />
                <span className="hidden md:block font-medium relative z-10">{item.label}</span>

                {isActive && (
                  <div className="absolute right-0 w-1 h-8 bg-cyan-400 rounded-l-full shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-6 hidden md:block">
        <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-center text-gray-400 relative z-10">Premium Öğrenci Asistanı</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
