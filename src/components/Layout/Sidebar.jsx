import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  Timer,
  ListTodo,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Panel' },
    { id: 'gpa', icon: Calculator, label: 'Ortalama' },
    { id: 'focus', icon: Timer, label: 'Odak' },
    { id: 'tasks', icon: ListTodo, label: 'Görevler' },
  ];

  return (
    <div className="fixed top-8 left-8 bottom-8 w-24 md:w-80 bento-glass rounded-[2.5rem] z-50 flex flex-col p-6 border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-4 mb-14 px-2">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3">
          <Sparkles className="text-white w-7 h-7" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-white tracking-tighter">UniLife</h1>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Premium</p>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full relative group outline-none"
            >
              <div className={`flex items-center gap-4 px-5 py-5 rounded-[1.5rem] transition-all duration-500 ${isActive
                  ? 'bg-white text-midnight shadow-2xl scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden md:block font-bold text-lg tracking-tight">{item.label}</span>
                {isActive && <ChevronRight size={18} className="ml-auto hidden md:block" />}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto hidden md:block">
        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/5 relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-black text-white mb-1">Destek Al</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Topluluğa Katıl & Yardımlaş</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
