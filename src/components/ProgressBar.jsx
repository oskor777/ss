import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize, FiMinimize, FiFileText, FiBook } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';

export default function ProgressBar({
  currentSlide,
  totalSlides,
  nextSlide,
  prevSlide,
  goToSlide,
  toggleNotes,
  showNotes,
  toggleVocab,
  showVocab,
  isFullscreen,
  toggleFullscreen
}) {
  const { t } = useLanguage();
  const progressPercent = ((currentSlide) / totalSlides) * 100;

  return (
    <footer className="w-full shrink-0 z-30 px-2 sm:px-6 py-1.5 sm:py-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md bg-white/80 dark:bg-slate-900/85 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Linear top progress line */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5 sm:mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500 rounded-full"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between gap-1.5 max-w-7xl mx-auto">
        {/* Left: Previous Button & Slide Counter */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 transition shadow-sm"
            aria-label="Previous Slide (Left Arrow)"
            title={t("Previous Slide (← or Space)", "Oldingi slayd (← yoki Space)")}
          >
            <FiChevronLeft className="text-lg sm:text-xl" />
          </motion.button>

          <span className="font-heading font-bold text-xs sm:text-base text-slate-800 dark:text-slate-200 tracking-wide px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-teal-600 dark:text-teal-400 font-extrabold">{currentSlide}</span>
            <span className="text-slate-400 dark:text-slate-500 mx-0.5 sm:mx-1">/</span>
            <span>{totalSlides}</span>
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 transition shadow-sm"
            aria-label="Next Slide (Right Arrow)"
            title={t("Next Slide (→ or Space)", "Keyingi slayd (→ yoki Space)")}
          >
            <FiChevronRight className="text-lg sm:text-xl" />
          </motion.button>
        </div>

        {/* Center: Clickable Dots (Hidden on small mobile, compact on tablet, full on desktop) */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 px-2 rounded-full bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => {
            const isActive = num === currentSlide;
            return (
              <button
                key={num}
                onClick={() => goToSlide(num)}
                aria-label={`Jump to slide ${num}`}
                title={`${t("Slide", "Slayd")} ${num}`}
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 h-2.5 bg-gradient-to-r from-teal-500 to-sky-500 shadow-glow'
                    : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-teal-400 dark:hover:bg-teal-400'
                }`}
              />
            );
          })}
        </div>

        {/* Right: Action Utilities */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Speaker Notes Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotes}
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border text-xs sm:text-sm font-medium transition shadow-sm ${
              showNotes
                ? 'bg-teal-500 text-white border-teal-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-teal-500'
            }`}
            title={t("Speaker Script (Press N)", "Taqdimotchi nutq matni (N)")}
          >
            <FiFileText className="text-sm sm:text-base" />
            <span className="hidden lg:inline">{t("Notes (N)", "Nutq (N)")}</span>
          </motion.button>

          {/* Vocabulary Drawer Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleVocab}
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border text-xs sm:text-sm font-medium transition shadow-sm ${
              showVocab
                ? 'bg-teal-500 text-white border-teal-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-teal-500'
            }`}
            title={t("Vocabulary Glossary (Press V)", "Kun tartibi lug'ati (V)")}
          >
            <FiBook className="text-sm sm:text-base" />
            <span className="hidden lg:inline">{t("Vocab (V)", "Lug'at (V)")}</span>
          </motion.button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Fullscreen Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="hidden xs:flex p-1.5 sm:p-2 rounded-full border text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:text-teal-500 transition shadow-sm"
            title={isFullscreen ? t("Exit Fullscreen (F)", "To'liq ekrandan chiqish (F)") : t("Enter Fullscreen (F)", "To'liq ekran (F)")}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <FiMinimize className="text-sm sm:text-base" /> : <FiMaximize className="text-sm sm:text-base" />}
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
