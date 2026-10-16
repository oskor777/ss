import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiGrid, FiActivity } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

export default function S09_ActivitiesTogether() {
  const { q4_whatWeDoTogether } = familyData;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-1.5 sm:gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiGrid className="text-xs sm:text-sm" /> {t('Slide 9 • Survey Question 4', '9-slayd • So\'rovnoma 4-savoli')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {q4_whatWeDoTogether.question}
          </h2>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 sm:mt-0">
          <FiActivity className="text-teal-500 shrink-0" />
          <span>{t('Practising Adverbs of Frequency (Always, Usually, Often, Sometimes)', 'Chastota ravishlarini qo\'llash (Always, Usually, Often, Sometimes)')}</span>
        </div>
      </div>

      {/* 6-Card Animated Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-auto">
        {q4_whatWeDoTogether.activities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="glass-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-teal-500/40 transition shadow-sm"
          >
            <div>
              {/* Top Row: Icon + Frequency Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {item.icon}
                </span>

                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-heading font-bold"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.adverb}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-1">
                {item.title}
              </h3>

              {/* Progress Bar of frequency */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden my-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                <span>{t('Participation Rate', 'Qatnashish darajasi')}</span>
                <span className="text-teal-500 dark:text-teal-400">
                  <AnimatedCounter value={item.percentage} suffix="%" />
                </span>
              </div>
            </div>

            {/* Natural Sentence Example */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
              "{item.sentence}"
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        {t('💡 Rule: Adverbs of frequency come before the main verb (We always eat, Father usually asks, We sometimes walk).', '💡 Qoida: Chastota ravishlari asosiy fe\'ldan oldin keladi (Biz har doim birga ovqatlanamiz, Dadam odatda so\'raydilar).')}
      </div>
    </div>
  );
}
