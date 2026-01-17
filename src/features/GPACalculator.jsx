import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GraduationCap, Calculator, TrendingDown, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GRADE_POINTS = {
    'AA': 4.0, 'BA': 3.5, 'BB': 3.0, 'CB': 2.5,
    'CC': 2.0, 'DC': 1.5, 'DD': 1.0, 'FD': 0.5, 'FF': 0.0
};

const GPACalculator = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Matematik I', credit: 4, grade: 'AA' },
        { id: 2, name: 'Fizik I', credit: 4, grade: 'BA' },
        { id: 3, name: 'Programlamaya Giriş', credit: 3, grade: 'BB' },
    ]);
    const [gpa, setGpa] = useState(0);

    useEffect(() => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const points = GRADE_POINTS[course.grade];
            const credit = parseFloat(course.credit);
            if (!isNaN(points) && !isNaN(credit)) {
                totalPoints += points * credit;
                totalCredits += credit;
            }
        });

        setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00);
    }, [courses]);

    const addCourse = () => {
        setCourses([{ id: Date.now(), name: 'Yeni Ders', credit: 3, grade: 'CC' }, ...courses]);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id, field, value) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12 md:mb-16">
                <div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
                    >
                        <GraduationCap size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Akademik Zirve</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter"
                    >
                        GPA <span className="text-glow-premium">Genius</span>.
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-[2.5rem] md:rounded-[3rem] bento-glass flex flex-col items-center justify-center border-primary/30 relative overflow-hidden group shadow-[0_32px_64px_-12px_rgba(99,102,241,0.3)] mx-auto lg:mx-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
                    <div className="text-6xl md:text-7xl font-black text-white group-hover:scale-110 transition-transform duration-500">{gpa}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">MEVCUT PUAN</div>
                    <TrendingUp className="text-primary mt-4" size={24} />
                </motion.div>
            </header>

            <div className="bento-card border-white/5 bg-slate-900/20 p-6 md:p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                            <Calculator className="text-primary" size={24} md:size={28} />
                            Ders Listesi
                        </h3>
                        <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">Girişlerini Buradan Yönet</p>
                    </div>
                    <button
                        onClick={addCourse}
                        className="w-full sm:w-auto btn-bento flex items-center justify-center gap-3 group px-6 py-4 md:px-8 md:py-4"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Yeni Ders Ekle</span>
                    </button>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {courses.map((course) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                layout
                                className="flex flex-col md:flex-row md:items-center gap-6 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-500 group"
                            >
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-lg md:text-xl font-bold text-white placeholder-white/20"
                                        placeholder="Dersin Adı..."
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                                    <div className="flex flex-col flex-1 sm:flex-none">
                                        <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1.5">Krediler</span>
                                        <input
                                            type="number"
                                            value={course.credit}
                                            onChange={(e) => updateCourse(course.id, 'credit', e.target.value)}
                                            className="w-full sm:w-20 bg-midnight rounded-xl md:rounded-2xl py-2.5 px-3 md:py-3 md:px-4 text-white text-center font-black focus:ring-2 focus:ring-primary transition-all outline-none border border-white/5"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1 sm:flex-none">
                                        <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1.5">Harf Notu</span>
                                        <select
                                            value={course.grade}
                                            onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                            className="w-full sm:w-24 bg-midnight border border-white/5 text-white rounded-xl md:rounded-2xl py-2.5 px-3 md:py-3 md:px-4 font-black outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer text-center"
                                        >
                                            {Object.keys(GRADE_POINTS).map(g => (
                                                <option key={g} value={g} className="bg-midnight">{g}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="p-3 md:p-4 text-slate-600 hover:text-secondary hover:bg-secondary/10 rounded-xl md:rounded-2xl transition-all ml-auto md:ml-0"
                                    >
                                        <Trash2 size={20} md:size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {courses.length === 0 && (
                    <div className="py-20 md:py-32 text-center rounded-[2rem] md:rounded-[2.5rem] border border-dashed border-white/10 bg-white/2">
                        <GraduationCap className="mx-auto text-slate-700 mb-4 md:mb-6" size={48} md:size={64} />
                        <p className="text-lg md:text-xl font-bold text-slate-400">Hiç ders eklenmemiş.</p>
                        <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">Yeni bir ders ekleyerek akademik takibine başla.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GPACalculator;
