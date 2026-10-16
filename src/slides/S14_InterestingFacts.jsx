import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiZap, FiCheckCircle } from 'react-icons/fi';

export default function S14_InterestingFacts() {
  const { interestingFacts } = familyData;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="mb-3 sm:mb-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
          <FiZap className="text-xs sm:text-sm" /> {t('Slide 14 • Research Discoveries', '14-slayd • Tadqiqot kashfiyotlari')}
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {t('5 Surprising Facts From My Survey', 'So\'rovnomamdan 5 ta hayratlanarli fakt')}
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
          {t('Unexpected discoveries calculated from our family routine interviews', 'Oila a\'zolari suhbatidan aniqlangan qiziqarli faktlar')}
        </p>
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-auto">
        {interestingFacts.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 bg-gradient-to-b ${item.color} flex flex-col justify-between hover:scale-[1.01] transition-all shadow-sm ${
              idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-white/60 dark:bg-slate-800/80 shadow-inner">
                  {item.icon}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-heading font-bold text-xs uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                {item.fact}
              </h3>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.detail}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-semibold">
              <FiCheckCircle className="text-sm" />
              <span>{t('Verified Data Point #', 'Tasdiqlangan fakt #')}{item.id}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        {t('💡 Presenter Tip: Use emphasis: "Did you know that my father wakes up two and a half hours before me?"', '💡 Ta\'kidlab o\'ting: "Dadam mendan roppa-rosa 2.5 soat oldin uyg\'onishlarini bilarmidingiz?"')}
      </div>
    </div>
  );
}
