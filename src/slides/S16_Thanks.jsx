import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { triggerConfetti } from '../components/Confetti';
import { playCelebrateSound } from '../utils/soundEffects';
import { FiCheckCircle, FiHeart, FiRotateCcw, FiHelpCircle, FiBook, FiVolume2 } from 'react-icons/fi';

export default function S16_Thanks({ onRestart, onOpenVocab }) {
  const { student } = familyData.projectInfo;
  const { t } = useLanguage();

  const handleCelebrate = () => {
    playCelebrateSound();
    triggerConfetti({ x: 0.5, y: 0.5 });
  };

  return (
    <div className="flex flex-col items-center justify-start sm:justify-center text-center max-w-4xl mx-auto min-h-full px-2.5 sm:px-4 py-3 sm:py-6">
      {/* Gentle Floating Trophy / Heart Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-3 sm:mb-5"
      >
        <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-teal-500/20 via-sky-500/20 to-amber-500/20 border-2 border-teal-500/40 flex items-center justify-center text-3xl sm:text-5xl shadow-xl backdrop-blur-md">
          🎉
        </div>
      </motion.div>

      {/* Main Thank You Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-2xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 dark:text-white mb-1.5 sm:mb-2 leading-tight"
      >
        {t('Thank You Very Much!', 'Katta Rahmat!')}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-sm sm:text-xl text-teal-600 dark:text-teal-400 font-heading font-semibold mb-4 sm:mb-6"
      >
        {t('"Any questions or comments about our family routines?"', '"Oilamiz kun tartibi haqida savol yoki fikrlaringiz bormi?"')}
      </motion.p>

      {/* 4 Summary Achievement Pills */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl w-full mb-4 sm:mb-6 text-left"
      >
        <div className="glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-lg sm:text-xl mb-1">📖</div>
          <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">{t('Routine Vocab', 'Kun tartibi lug\'ati')}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{t('Verbs & adverbs used', 'Fe\'l va ravishlar')}</div>
        </div>

        <div className="glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-lg sm:text-xl mb-1">✍️</div>
          <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">Present Simple</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{t('Accurate grammar', 'Aniq grammatika')}</div>
        </div>

        <div className="glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-lg sm:text-xl mb-1">📊</div>
          <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">{t('Survey Charts', 'Diagrammalar')}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{t('5 members analyzed', '5 a\'zo tahlil qilindi')}</div>
        </div>

        <div className="glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-lg sm:text-xl mb-1">🗣️</div>
          <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">{t('Public Speaking', 'Nutq so\'zlash')}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{t('Clear English delivery', 'Ravon va aniq nutq')}</div>
        </div>
      </motion.div>

      {/* Mandatory Rubric Credit Line: Teamwork & Collaboration (5 points) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="glass-card px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl border border-teal-500/30 bg-teal-500/10 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-teal-800 dark:text-teal-200 font-medium mb-4 sm:mb-6"
      >
        <FiHeart className="text-rose-500 text-base sm:text-lg shrink-0" />
        <span className="text-[11px] sm:text-xs leading-relaxed text-left">
          <strong>{t('Credit & Collaboration:', 'Hamkorlik va minnatdorchilik:')}</strong>{' '}
          {t(
            'Special thanks to my dear family (Father Baxtiyor, Mother Nodira, Muhammadsodiq, Sora, Muhammadbilol, and Sofiya) for kindly answering my interview questions.',
            'Savollarimga samimiy javob bergan aziz oilamga (Dadam Baxtiyor, Onam Nodira, Muhammadsodiq, Sora, Muhammadbilol va Sofiya) chuqur minnatdorchilik bildiraman.'
          )}
        </span>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none"
      >
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-heading font-bold text-xs sm:text-sm transition shadow-sm"
        >
          <FiRotateCcw className="text-base" />
          <span>{t('Restart Presentation', 'Qaytadan boshlash')}</span>
        </button>

        <button
          onClick={onOpenVocab}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-heading font-bold text-xs sm:text-sm transition shadow-lg shadow-teal-500/25"
        >
          <FiBook className="text-base" />
          <span>{t('Review Vocabulary (V)', 'Lug\'atni ko\'rish (V)')}</span>
        </button>

        <button
          onClick={handleCelebrate}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-heading font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/25"
          title={t('Click to celebrate with confetti and victory sound!', 'G\'alaba sadolari va konfetti bilan nishonlang!')}
        >
          <span>🎊</span>
          <span>{t('Celebrate (Confetti)', 'Nishonlash (Konfetti)')}</span>
        </button>
      </motion.div>
    </div>
  );
}
