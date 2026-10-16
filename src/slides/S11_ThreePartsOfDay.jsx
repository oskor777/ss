import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiSun, FiMoon, FiCloud } from 'react-icons/fi';

export default function S11_ThreePartsOfDay() {
  const { threePartsOfDay } = familyData;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="mb-3 sm:mb-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
          <FiSun className="text-xs sm:text-sm" /> {t('Slide 11 • Routine Comparison', '11-slayd • Kun qismlari taqqoslashi')}
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {threePartsOfDay.title}
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
          {threePartsOfDay.subtitle}
        </p>
      </div>

      {/* 3 Columns: Morning, Afternoon, Evening */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-auto">
        {threePartsOfDay.parts.map((col, idx) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.45 }}
            className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border flex flex-col justify-between ${col.borderColor} bg-gradient-to-b ${col.accent} shadow-sm`}
          >
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                    {col.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                    {col.tagline}
                  </div>
                </div>
                <span className="text-3xl p-2 rounded-2xl bg-white/50 dark:bg-slate-800/80 shadow-inner">
                  {col.icon}
                </span>
              </div>

              {/* Routine list */}
              <div className="space-y-2.5">
                {col.routines.map((routine, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-xs leading-relaxed"
                  >
                    <div className="flex items-center gap-1.5 font-heading font-bold text-slate-900 dark:text-white mb-1">
                      <span>{routine.icon}</span>
                      <span>{routine.person}</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300">
                      {routine.habit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              {t('Present Simple: 3rd person singular -(e)s', 'Present Simple: 3-shaxs birlikda -(e)s qo\'shiladi')}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
