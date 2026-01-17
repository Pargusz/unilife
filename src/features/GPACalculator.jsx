import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
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
        setCourses([...courses, { id: Date.now(), name: 'Yeni Ders', credit: 3, grade: 'CC' }]);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id, field, value) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">Not Ortalaması</h2>
                    <p className="text-gray-400">Dönemlik veya genel not ortalamanı hesapla.</p>
                </div>

                <motion.div
                    className="glass-panel p-6 rounded-2xl flex items-center gap-6 min-w-[200px]"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/30">
                        {gpa}
                    </div>
                    <div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Mevcut AGNO</div>
                        <div className="text-xs text-blue-300">Harika gidiyorsun!</div>
                    </div>
                </motion.div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <GraduationCap className="text-purple-400" /> Ders Listesi
                    </h3>
                    <button
                        onClick={addCourse}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all font-medium text-sm shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={16} /> Ders Ekle
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-4 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-12 md:col-span-5">Ders Adı</div>
                    <div className="col-span-4 md:col-span-3">Kredi</div>
                    <div className="col-span-4 md:col-span-3">Harf Notu</div>
                    <div className="col-span-4 md:col-span-1 text-center">Sil</div>
                </div>

                <AnimatePresence>
                    <div className="space-y-3">
                        {courses.map((course) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="grid grid-cols-12 gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                                layout
                            >
                                <div className="col-span-12 md:col-span-5">
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent focus:border-cyan-500 outline-none text-white placeholder-gray-600 transition-colors py-1"
                                        placeholder="Ders Adı"
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-3">
                                    <input
                                        type="number"
                                        value={course.credit}
                                        onChange={(e) => updateCourse(course.id, 'credit', e.target.value)}
                                        className="w-full bg-transparent border-none outline-none text-white text-center bg-white/5 rounded-lg py-2 focus:ring-2 ring-purple-500/50"
                                        min="0"
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-3">
                                    <select
                                        value={course.grade}
                                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                        className="w-full bg-[#0a0a1a] border border-white/10 text-white rounded-lg py-2 px-2 outline-none focus:border-purple-500"
                                    >
                                        {Object.keys(GRADE_POINTS).map(g => (
                                            <option key={g} value={g}>{g} ({GRADE_POINTS[g]})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4 md:col-span-1 flex justify-center">
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GPACalculator;
