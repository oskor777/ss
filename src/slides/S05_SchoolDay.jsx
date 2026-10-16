import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiClock, FiBookOpen, FiSun, FiMoon, FiCoffee } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

export default function S05_SchoolDay() {
  const { schoolDay } = familyData;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiClock className="text-xs sm:text-sm" /> {t('Slide 5 • Student Routine', '5-slayd • O\'quvchi kun tartibi')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {schoolDay.headline}
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-teal-500/20 to-sky-500/20 border border-teal-500/40 text-teal-700 dark:text-teal-300 font-heading font-bold text-xs sm:text-base flex items-center gap-2 shadow-sm self-start sm:self-auto">
          <span>📚</span>
          <span>
            <AnimatedCounter value={6} suffix={` ${t('Lessons', 'Dars')}`} /> = {t('4 h 30 min of instruction', '4 soat 30 daqiqa dars')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left Column: School Lessons Timeline (13:00 - 18:00) (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FiBookOpen className="text-teal-500" />
              <span>{t('Timetable: 6 Lessons × 45 Min (with 6-Min Breaks)', 'Dars jadvali: 6 dars × 45 daq (6 daq tanaffuslar bilan)')}</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">13:00 – 18:00</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {schoolDay.schedule.map((lesson, idx) => (
              <motion.div
                key={lesson.period}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-teal-500/40 transition flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-heading font-extrabold flex items-center justify-center text-sm border border-teal-500/30 shrink-0">
                  {lesson.period}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {lesson.subject}
                    </span>
                    <span className="text-sm shrink-0">{lesson.icon}</span>
                  </div>
                  <div className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                    {lesson.start} – {lesson.end}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t('⏱️ 5 short breaks × 6 minutes = 30 min total recreation', '⏱️ 5 ta qisqa tanaffus × 6 daqiqa = jami 30 daqiqa dam olish')}</span>
            <span className="text-teal-500 font-semibold">{t('100% On Time', '100% O\'z vaqtida')}</span>
          </div>
        </div>

        {/* Right Column: Free Morning Advantage & Evening Reunion (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Free Morning Routine Card */}
          <div className="glass-card rounded-3xl p-4 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent">
            <div className="flex items-center gap-2 mb-2 text-amber-500 font-heading font-bold text-sm sm:text-base">
              <FiSun className="text-lg" />
              <span>{t('Why My Morning is Free & Productive:', 'Tongim nega bo\'sh va sermahsul:')}</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="text-teal-500 font-bold">08:00</span>
                <span>{t('I wake up comfortably and breathe fresh morning air.', 'Ertalab xotirjam uyg\'onib, toza havodan nafas olaman.')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 font-bold">09:15</span>
                <span>{t('I do homework and read English stories for 1.5 hours.', '1.5 soat davomida uy vazifalarini bajarib, inglizcha hikoyalar o\'qiyman.')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 font-bold">11:00</span>
                <span>{t('I do physical exercise and help my mother prepare lunch.', 'Badantarbiya qilaman va onamga tushlik tayyorlashda yordamlashaman.')}</span>
              </li>
            </ul>
          </div>

          {/* Evening Reunion Card */}
          <div className="glass-card rounded-3xl p-4 border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-heading font-bold text-sm sm:text-base">
              <FiMoon className="text-lg" />
              <span>{t('After-School & Evening Time:', 'Maktabdan keyin va oqshom vaqti:')}</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">18:20</span>
                <span>{t('I return home from school and relax with family.', 'Maktabdan uyga qaytib, oilam davrasida dam olaman.')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">19:30</span>
                <span>{t('We gather at the table and eat warm dinner together.', 'Dasturxon atrofida yig\'ilib, birgalikda issiq kechki ovqat tanovul qilamiz.')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">22:30</span>
                <span>{t('I review my school notes and go to sleep peacefully.', 'Dars konspektlarimni takrorlab, xotirjam uyquga yotaman.')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
