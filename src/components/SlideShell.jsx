import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function SlideShell({
  children,
  currentSlide,
  direction,
  category = "English BSB Project",
  touchHandlers
}) {
  const shouldReduceMotion = useReducedMotion();
  const { data, lang } = useLanguage();

  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.14,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -20 : 20,
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.08,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <div 
      className="relative flex-1 flex flex-col w-full h-full overflow-hidden select-none"
      {...touchHandlers}
    >
      {/* Top Slide Header with Language Toggle */}
      <header className="w-full shrink-0 px-3 sm:px-8 py-2 sm:py-2.5 pt-[max(0.5rem,env(safe-area-inset-top))] flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm z-20">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <span className="text-lg sm:text-xl shrink-0">🏠</span>
          <div className="min-w-0">
            <h1 className="font-heading font-extrabold text-[11px] sm:text-sm tracking-wide text-slate-800 dark:text-slate-200 uppercase truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
              {data.projectInfo.title}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-teal-600 dark:text-teal-400 font-medium truncate">
              {category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
          {/* Header Language Switcher (UZB / EN) */}
          <LanguageToggle />

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
            <span>{data.projectInfo.student.avatarEmoji}</span>
            <span className="font-medium">{data.projectInfo.student.name}</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold">{data.projectInfo.student.grade}</span>
          </div>
        </div>
      </header>

      {/* Slide Body Animated Transition */}
      <main className="relative flex-1 flex flex-col w-full h-full p-2.5 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden z-10 scroll-smooth">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            className="w-full min-h-full max-w-7xl mx-auto flex flex-col justify-start sm:justify-center py-1 sm:py-0"
          >
            <div key={lang} className="w-full min-h-full flex flex-col justify-start sm:justify-center">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
