import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiArrowRight, FiClock, FiCalendar, FiUser, FiAward } from 'react-icons/fi';

export default function S01_Title({ onNext }) {
  const { projectInfo } = familyData;
  const { isUz, t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto min-h-full px-3 sm:px-4 py-3 sm:py-6">
      {/* Animated Clock / Sun & Moon Graphic */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mb-3 sm:mb-6"
      >
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-teal-500/20 via-sky-500/20 to-amber-500/20 p-2 border-2 border-teal-500/30 flex items-center justify-center shadow-xl backdrop-blur-md">
          {/* Animated Clock SVG */}
          <svg className="w-14 h-14 sm:w-20 sm:h-20" viewBox="0 0 100 100">
            {/* Clock Face */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-teal-500/60" />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-teal-400" />
            {/* Hour ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="10"
                x2="50"
                y2="15"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-400 dark:text-slate-500"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Rotating Minute Hand (GPU CSS) */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="18"
              stroke="#14b8a6"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="clock-minute-hand"
            />
            {/* Rotating Hour Hand (GPU CSS) */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
              className="clock-hour-hand"
            />
          </svg>
        </div>

        {/* Sun and Moon Badges */}
        <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-xl sm:text-2xl filter drop-shadow-md select-none">
          ☀️
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 text-xl sm:text-2xl filter drop-shadow-md select-none">
          🌙
        </span>
      </motion.div>

      {/* Summative Assessment Tag */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[11px] sm:text-sm font-semibold mb-3 sm:mb-4"
      >
        <FiAward className="text-sm sm:text-base shrink-0" />
        <span>{t("English BSB Summative Assessment Project", "7-sinf Ingliz tili BSB Loyihasi")}</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight"
      >
        {projectInfo.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm sm:text-xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mb-5 sm:mb-8"
      >
        {projectInfo.subtitle}
      </motion.p>

      {/* Student Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card px-4 sm:px-6 py-3 sm:py-4 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-5 sm:mb-8 border border-slate-200 dark:border-slate-800 w-full max-w-sm sm:max-w-none"
      >
        <div className="flex items-center gap-2 text-left w-full sm:w-auto">
          <span className="text-2xl">{projectInfo.student.avatarEmoji}</span>
          <div>
            <div className="text-[10px] sm:text-xs text-slate-400">{t("Researcher & Student", "Tadqiqotchi va o'quvchi")}</div>
            <div className="font-heading font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-base">
              {projectInfo.student.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-left w-full sm:w-auto">
          <FiUser className="text-lg sm:text-xl text-teal-500 shrink-0" />
          <div>
            <div className="text-[10px] sm:text-xs text-slate-400">{t("Age & Grade", "Yoshi va sinfi")}</div>
            <div className="font-heading font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-base">
              {projectInfo.student.age} {t("years old", "yoshda")} • {projectInfo.student.grade}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-left w-full sm:w-auto">
          <FiCalendar className="text-lg sm:text-xl text-amber-500 shrink-0" />
          <div>
            <div className="text-[10px] sm:text-xs text-slate-400">{t("Household Survey", "Oilaviy so'rovnoma")}</div>
            <div className="font-heading font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-base">
              {t("7 Family Members • 5 Interviews", "7 oila a'zosi • 5 ta intervyu")}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Start Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-2 sm:gap-3 w-full sm:w-auto"
      >
        <button
          onClick={onNext}
          className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-600 text-white font-heading font-bold text-base sm:text-lg shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          <span>{t("Start Presentation", "Taqdimotni boshlash")}</span>
          <FiArrowRight className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <span className="sm:hidden">{t("👈 Swipe left to browse slides", "👈 Slaydlarni ko'rish uchun chapga suring")}</span>
          <span className="hidden sm:inline">
            {t("or press", "yoki")} <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">Space</kbd> / <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">→</kbd> {t("to advance", "bosing")}
          </span>
        </span>
      </motion.div>
    </div>
  );
}
