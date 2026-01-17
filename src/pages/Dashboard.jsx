import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Clock,
    CheckSquare,
    Sparkles,
    ArrowUpRight,
    Flame,
    Zap,
    Quote
} from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'GÜNAYDIN' : hour < 18 ? 'TÜNAYDIN' : 'İYİ GECELER';

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="space-y-12">
            <header className="mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bento-glass mb-6 border-white/10"
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">{greeting}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
                >
                    Uni<span className="text-primary italic">Life</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-400 mt-6 max-w-xl font-medium"
                >
                    Kontrol sende. Akademik zirveye giden yolun <span className="text-white">burada başlıyor.</span>
                </motion.p>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
                {/* GPA Box - Large */}
                <motion.div
                    variants={item}
                    onClick={() => setActiveTab('gpa')}
                    className="md:col-span-2 lg:col-span-3 bento-card bg-gradient-to-br from-primary/20 to-transparent group cursor-pointer border-primary/20"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                            <TrendingUp size={32} />
                        </div>
                        <ArrowUpRight className="text-slate-600 group-hover:text-white transition-colors" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">Akademik Durum</h3>
                        <div className="flex items-baseline gap-4">
                            <span className="text-7xl font-black text-white tracking-tighter">3.42</span>
                            <span className="text-primary font-black text-xl italic uppercase tracking-widest">Başarılı</span>
                        </div>
                    </div>
                </motion.div>

                {/* Focus Box - Square */}
                <motion.div
                    variants={item}
                    onClick={() => setActiveTab('focus')}
                    className="md:col-span-2 lg:col-span-3 bento-card bg-gradient-to-br from-secondary/20 to-transparent group cursor-pointer border-secondary/20"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="w-16 h-16 rounded-3xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/20 group-hover:rotate-12 transition-transform duration-500">
                            <Clock size={32} />
                        </div>
                        <Zap className="text-secondary/40 fill-secondary/20 animate-pulse" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">Odak Süresi</h3>
                        <div className="flex items-baseline gap-4">
                            <span className="text-7xl font-black text-white tracking-tighter">45</span>
                            <span className="text-secondary font-black text-xl italic uppercase tracking-widest">Dakika</span>
                        </div>
                    </div>
                </motion.div>

                {/* Tasks Box - Wide bottom */}
                <motion.div
                    variants={item}
                    onClick={() => setActiveTab('tasks')}
                    className="md:col-span-4 lg:col-span-4 bento-card bg-gradient-to-br from-accent/20 to-transparent group cursor-pointer border-accent/20"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent border border-accent/20">
                                <CheckSquare size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white">Bekleyen Görevler</h3>
                        </div>
                        <div className="bg-accent/10 px-4 py-2 rounded-full text-accent font-black text-xs uppercase tracking-widest">
                            3 AKTİF
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="w-2/3 h-full bg-accent/40 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quote Box - Small Tall */}
                <motion.div
                    variants={item}
                    className="md:col-span-2 lg:col-span-2 bento-card bg-slate-900/60 flex flex-col justify-between"
                >
                    <Quote size={40} className="text-primary/40 mb-8" />
                    <p className="text-lg font-bold text-slate-300 italic leading-relaxed">
                        "Büyük işler, küçük başlangıçlarla inşa edilir."
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <p className="text-xs font-black text-primary uppercase tracking-widest">MARK TWAIN</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
