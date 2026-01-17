import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckSquare, Sparkles } from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'Tünaydın' : 'İyi Geceler';

    const stats = [
        { title: 'Ortalama', value: '3.42', icon: TrendingUp, color: 'from-cyan-400 to-blue-500', action: 'gpa' },
        { title: 'Odak Süresi', value: '45dk', icon: Clock, color: 'from-purple-400 to-pink-500', action: 'focus' },
        { title: 'Bekleyen Görev', value: '3', icon: CheckSquare, color: 'from-orange-400 to-red-500', action: 'tasks' },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
                    {greeting}, Şampiyon <Sparkles className="text-yellow-400" fill="currentColor" />
                </h1>
                <p className="text-xl text-gray-400">Yeni bir günü fethetmeye hazır mısın?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setActiveTab(stat.action)}
                            className="glass-panel p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <div className="text-gray-400 font-medium mb-1">{stat.title}</div>
                                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                                </div>
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-8 rounded-2xl"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Günün Sözü</h3>
                    <blockquote className="text-lg text-gray-300 italic mb-4">
                        "Başlamanın sırrı, harekete geçmektir."
                    </blockquote>
                    <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">— Mark Twain</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-panel p-8 rounded-2xl bg-gradient-to-br from-[#1a0b2e] to-[#0a0a1a] border border-purple-500/20"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Hızlı İşlemler</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveTab('focus')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                            <div className="text-purple-400 mb-2"><Clock /></div>
                            <div className="text-sm font-semibold">Sayaç Başlat</div>
                        </button>
                        <button onClick={() => setActiveTab('gpa')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                            <div className="text-cyan-400 mb-2"><TrendingUp /></div>
                            <div className="text-sm font-semibold">Not Ekle</div>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
