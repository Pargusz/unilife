import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Coffee, Brain, Moon, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MODES = {
    TYPE_FOCUS: {
        time: 25 * 60,
        label: 'DERİN ODAK',
        color: 'bg-primary',
        glow: 'shadow-primary/40',
        light: 'bg-primary/20',
        icon: Brain
    },
    TYPE_SHORT: {
        time: 5 * 60,
        label: 'KISA MOLA',
        color: 'bg-accent',
        glow: 'shadow-accent/40',
        light: 'bg-accent/20',
        icon: Coffee
    },
    TYPE_LONG: {
        time: 15 * 60,
        label: 'UZUN MOLA',
        color: 'bg-secondary',
        glow: 'shadow-secondary/40',
        light: 'bg-secondary/20',
        icon: Moon
    }
};

const FocusTimer = () => {
    const [mode, setMode] = useState('TYPE_FOCUS');
    const [timeLeft, setTimeLeft] = useState(MODES.TYPE_FOCUS.time);
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'TYPE_FOCUS') setCycle(c => c + 1);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODES[mode].time);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(MODES[newMode].time);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const current = MODES[mode];
    const Icon = current.icon;

    return (
        <div className="flex flex-col items-center">
            <header className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-6"
                >
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Zihin Akışı</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-7xl font-black text-white tracking-tighter"
                >
                    Focus <span className="text-secondary text-glow-premium italic">Flow</span>.
                </motion.h1>
            </header>

            {/* Mode Selectors */}
            <div className="flex gap-2 p-2 bento-glass rounded-[2rem] border-white/5 mb-20 shadow-2xl">
                {Object.entries(MODES).map(([key, config]) => {
                    const ModeIcon = config.icon;
                    const isSelected = mode === key;
                    return (
                        <button
                            key={key}
                            onClick={() => switchMode(key)}
                            className={`px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center gap-3 transition-all duration-500 ${isSelected
                                    ? `${config.color} text-white shadow-2xl ${config.glow} scale-[1.05]`
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <ModeIcon size={20} />
                            <span className="hidden sm:inline">{config.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
                {/* Main Timer Bento */}
                <div className="lg:col-span-1 bento-card border-secondary/20 flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-secondary/10 to-transparent">
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className={`absolute w-72 h-72 rounded-full ${current.color} opacity-20 blur-[100px] pointer-events-none`}
                            />
                        )}
                    </AnimatePresence>

                    <motion.div
                        key={timeLeft}
                        className="text-[10rem] font-black text-white tracking-tighter leading-none z-10"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {formatTime(timeLeft).split(':')[0]}
                        <p className="text-3xl text-secondary font-black text-center mt-[-20px] tracking-[0.5em]">DAKİKA</p>
                    </motion.div>

                    <div className="text-9xl font-black text-white/5 absolute bottom-4 right-8 select-none pointer-events-none tracking-tighter">
                        {formatTime(timeLeft).split(':')[1]}
                    </div>
                </div>

                {/* Controls & Stats Bento */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bento-card border-white/5 flex-1 flex flex-col items-center justify-center px-10">
                        <div className="flex gap-8 items-center">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={resetTimer}
                                className="w-16 h-16 rounded-3xl bento-glass flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                            >
                                <RefreshCw size={28} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTimer}
                                className={`w-32 h-32 rounded-[3rem] ${current.color} text-white flex items-center justify-center shadow-2xl ${current.glow} border-8 border-white/10`}
                            >
                                {isActive ? <Pause size={48} fill="white" /> : <Play size={48} fill="white" className="ml-2" />}
                            </motion.button>

                            <div className="w-16 h-16 rounded-3xl bento-glass flex flex-col items-center justify-center text-secondary border-secondary/20">
                                <p className="text-xs font-black uppercase opacity-60 italic tracking-tighter">Round</p>
                                <span className="text-2xl font-black">{cycle}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card bg-primary text-white border-none flex items-center gap-6 group hover:translate-y-0 hover:scale-[1.02] cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            <Zap size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] opacity-80 italic">Enerji Modu</p>
                            <h4 className="text-xl font-bold tracking-tight">Müzik & Ambiyansı Aç</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FocusTimer;
