import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Coffee, Brain, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MODES = {
    TYPE_FOCUS: { time: 25 * 60, label: 'Derin Odak', color: 'from-cyan-500 to-blue-500' },
    TYPE_SHORT: { time: 5 * 60, label: 'Kısa Mola', color: 'from-green-400 to-emerald-500' },
    TYPE_LONG: { time: 15 * 60, label: 'Uzun Mola', color: 'from-purple-500 to-pink-500' }
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
            // Play sound here ideally
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

    const currentColor = MODES[mode].color;

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">Odak Modu</h2>
                <p className="text-gray-400">Nefesine odaklan. Zihnini serbest bırak.</p>
            </div>

            {/* Mode Selectors */}
            <div className="flex gap-4 mb-12 bg-white/5 p-2 rounded-2xl backdrop-blur-sm">
                <button
                    onClick={() => switchMode('TYPE_FOCUS')}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all ${mode === 'TYPE_FOCUS' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Brain size={18} /> Odak
                </button>
                <button
                    onClick={() => switchMode('TYPE_SHORT')}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all ${mode === 'TYPE_SHORT' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Coffee size={18} /> Kısa Mola
                </button>
                <button
                    onClick={() => switchMode('TYPE_LONG')}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all ${mode === 'TYPE_LONG' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Moon size={18} /> Uzun Mola
                </button>
            </div>

            {/* Timer Circle */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                {/* Animated Background Rings */}
                <AnimatePresence>
                    {isActive && (
                        <>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0.2 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentColor} blur-xl`}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 0.4 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                                className={`absolute inset-0 rounded-full bg-gradient-to-bl ${currentColor} blur-2xl`}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Glass Container */}
                <div className="relative z-10 w-full h-full glass-panel rounded-full flex flex-col items-center justify-center border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <motion.div
                        key={timeLeft}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400`}
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {formatTime(timeLeft)}
                    </motion.div>
                    <div className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-xs">
                        {isActive ? 'AKIŞTA' : 'DURAKLATILDI'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTimer}
                    className={`h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-tr ${currentColor} text-white shadow-lg shadow-cyan-500/20`}
                >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetTimer}
                    className="h-16 w-16 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    <RefreshCw size={28} />
                </motion.button>
            </div>

            <div className="mt-8 text-gray-500 text-sm">
                Bugünkü Toplam Döngü: <span className="text-white font-bold">{cycle}</span>
            </div>
        </div>
    );
};

export default FocusTimer;
