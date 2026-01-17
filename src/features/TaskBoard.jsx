import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, X, Calendar, ListTodo, Search, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Matematik Ödevini Tamamla', completed: false, tag: 'Akademik', date: 'Bugün', priority: true },
        { id: 2, text: 'Bahar Dönemi Kaydı', completed: true, tag: 'İdari', date: 'Dün', priority: false },
        { id: 3, text: 'Proje Toplantısı', completed: false, tag: 'Grup', date: 'Yarın', priority: true },
    ]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([{
            id: Date.now(),
            text: newTask,
            completed: false,
            tag: 'Genel',
            date: 'Bugün',
            priority: false
        }, ...tasks]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                <div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6"
                    >
                        <ListTodo size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verimlilik</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl font-black text-white tracking-tighter"
                    >
                        Task <span className="text-accent italic text-glow-premium">Master</span>.
                    </motion.h1>
                </div>

                <div className="flex gap-4">
                    <div className="bento-glass px-8 py-6 rounded-[2rem] flex flex-col items-center min-w-[120px]">
                        <span className="text-4xl font-black text-white">{tasks.filter(t => !t.completed).length}</span>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">BEKLEYEN</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input & Stats Bento */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bento-card border-white/5 flex flex-col gap-6">
                        <h3 className="text-xl font-black text-white">Yeni Ekle</h3>
                        <form onSubmit={addTask} className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Göreviniz..."
                                    className="w-full bg-midnight border border-white/10 rounded-2xl py-5 px-6 text-white font-bold outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder-white/20"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 aspect-square bg-accent text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest">
                                <Zap size={14} className="text-accent" />
                                Hızlı Öneri: "Sunum dosyasını hazırla"
                            </div>
                        </div>
                    </div>

                    <div className="bento-card bg-accent text-white border-none flex flex-col justify-between group overflow-hidden">
                        <Star className="absolute top-[-20px] right-[-20px] w-40 h-40 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h4 className="text-3xl font-black leading-tight italic">Bugünü Feth et.</h4>
                            <p className="text-sm font-bold opacity-80 mt-4 leading-relaxed">Önemli görevlerini yıldızla ve odaklanmaya başla.</p>
                        </div>
                        <button className="mt-12 bg-white text-accent px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl self-start relative z-10">
                            TÜMÜNÜ SIRALA
                        </button>
                    </div>
                </div>

                {/* Task List Bento */}
                <div className="lg:col-span-2 bento-card border-white/5 bg-slate-900/20">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black text-white">Görevlerim</h3>
                        <div className="flex gap-2">
                            <Search size={20} className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    layout
                                    className={`flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 group ${task.completed ? 'bg-white/2 opacity-40 grayscale-[0.8]' : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/40'
                                        }`}
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`transition-all duration-500 ${task.completed ? 'text-accent scale-110' : 'text-slate-600 hover:text-white'
                                                }`}
                                        >
                                            {task.completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                                        </button>

                                        <div>
                                            <h4 className={`text-xl font-black tracking-tight transition-all duration-500 ${task.completed ? 'line-through' : 'text-white'
                                                }`}>
                                                {task.text}
                                            </h4>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase">
                                                    <Calendar size={12} className="text-accent" /> {task.date}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-slate-800" />
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${task.priority ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-white/10 text-slate-400'
                                                    }`}>
                                                    {task.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="p-3 text-slate-700 hover:text-secondary hover:bg-secondary/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {tasks.length === 0 && (
                            <div className="py-32 text-center">
                                <p className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter italic">BOŞA ÇIKTIN.</p>
                                <p className="text-sm text-slate-500 font-bold mt-2">Daha fazla görev ekle veya mola ver.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
