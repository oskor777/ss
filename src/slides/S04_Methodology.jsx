import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiFileText, FiCheckSquare, FiPieChart, FiArrowRight } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

export default function S04_Methodology() {
  const { surveyMethodology } = familyData;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-6xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="mb-3 sm:mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
          <FiFileText className="text-xs sm:text-sm" /> {t('Slide 4 • Research Process', '4-slayd • Tadqiqot jarayoni')}
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {surveyMethodology.title}
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
          {t('A scientific 3-step investigation into daily schedules and family time', 'Kun tartibi va oilaviy vaqtni o\'rganish bo\'yicha 3 bosqichli ilmiy tadqiqot')}
        </p>
      </div>

      {/* 3-Step Animated Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {surveyMethodology.steps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-teal-500/40 transition-all"
          >
            {/* Step Number Top Pill */}
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 font-heading font-extrabold flex items-center justify-center text-lg border border-teal-500/30">
                0{step.step}
              </span>
              <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </span>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                {step.time}
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center text-xs text-teal-600 dark:text-teal-400 font-semibold gap-1">
              <span>{t('Verified Phase', 'Tasdiqlangan bosqich')}</span>
              <FiCheckSquare className="ml-auto" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Survey Statistics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
      >
        <div className="p-2">
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-teal-600 dark:text-teal-400">
            <AnimatedCounter value={5} suffix={` ${t('Questions', 'Savollar')}`} />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('Daily routine survey', 'Kunlik reja so\'rovnomasi')}</div>
        </div>

        <div className="p-2">
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sky-600 dark:text-sky-400">
            <AnimatedCounter value={5} suffix={` ${t('Interviews', 'Suhbatlar')}`} />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('Family respondents', 'Oila a\'zolari qatnashchilari')}</div>
        </div>

        <div className="p-2">
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-500">
            <AnimatedCounter value={7} suffix={` ${t('People', 'Kishi')}`} />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('Total household size', 'Jami oila a\'zolari')}</div>
        </div>

        <div className="p-2">
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-500">
            <AnimatedCounter value={100} suffix="%" />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('Survey accuracy & completion', 'So\'rovnoma to\'liqligi va aniqligi')}</div>
        </div>
      </motion.div>
    </div>
  );
}
