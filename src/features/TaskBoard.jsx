import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Matematik Ödevini Tamamla', completed: false, tag: 'Ders', date: 'Bugün' },
        { id: 2, text: 'Bahar Dönemi Kaydı', completed: true, tag: 'İdari', date: 'Dün' },
        { id: 3, text: 'Proje Toplantısı', completed: false, tag: 'Proje', date: 'Yarın' },
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
            date: 'Bugün'
        }, ...tasks]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const activeTasks = tasks.filter(t => !t.completed).length;

    return (
        <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">Görev Yöneticisi</h2>
                    <p className="text-gray-400">Ödevlerini ve hedeflerini yönet.</p>
                </div>
                <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{activeTasks}</span>
                    <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Bekleyen</span>
                </div>
            </div>

            <div className="glass-panel p-1 rounded-2xl mb-8">
                <form onSubmit={addTask} className="flex gap-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Ne yapılması gerekiyor?"
                        className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        <Plus />
                    </button>
                </form>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            layout
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${task.completed
                                    ? 'bg-white/5 border-white/5 opacity-60'
                                    : 'bg-white/10 border-white/10 hover:border-purple-500/50 hover:bg-white/15'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <button onClick={() => toggleTask(task.id)} className={`transition-colors ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}>
                                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </button>
                                <div>
                                    <div className={`font-medium text-lg transition-all ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                        {task.text}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {task.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span className="text-purple-400">{task.tag}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    ))}
                    {tasks.length === 0 && (
                        <div className="text-center text-gray-500 py-10">Henüz bir görev yok. Keyfine bak!</div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskBoard;
