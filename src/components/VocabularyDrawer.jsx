import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiBook, FiCheckCircle, FiVolume2, FiSquare } from 'react-icons/fi';
import { familyData } from '../data/familyData';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../context/LanguageContext';

export default function VocabularyDrawer({ isOpen, onClose }) {
  const { isUz, t, data } = useLanguage();
  const { speakingId, speak, stop } = useSpeech();

  const handleToggleSpeakWord = (item, idx) => {
    const wordId = `word-${idx}`;
    if (speakingId === wordId) {
      stop();
    } else {
      speak(`${item.word}. ${item.example}`, wordId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              stop();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-700/80 p-4 sm:p-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl flex flex-col text-slate-100 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-teal-400">
                <FiBook className="text-2xl" />
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">{t("Key Routine Vocabulary", "Asosiy kun tartibi lug'ati")}</h3>
                  <p className="text-xs text-slate-400">{t("7th-Grade Summative Assessment", "7-sinf BSB baholash loyihasi")}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  stop();
                  onClose();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close vocabulary panel"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300">
                💡 <strong>{t("Grammar Tip:", "Grammatika:")}</strong> {t("Use -s / -es with He, She, It in Present Simple! Example: 'He wakes up', 'She teaches'.", "Present Simple zamonida He, She, It uchun fe'llarga -s / -es qo'shiladi! Misol: 'He wakes up', 'She teaches'.")}
              </div>

              {data.vocabulary.map((item, idx) => {
                const isPlaying = speakingId === `word-${idx}`;

                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      isPlaying
                        ? 'bg-teal-950/70 border-teal-400 ring-1 ring-teal-400/80 shadow-md'
                        : 'bg-slate-800/70 border-slate-700/60 hover:border-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-teal-300 text-base">
                        {item.word}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                          {item.type}
                        </span>

                        <button
                          onClick={() => handleToggleSpeakWord(item, idx)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isPlaying
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white'
                          }`}
                          title={isPlaying ? "To'xtatish" : "Talaffuzni tinglash"}
                        >
                          {isPlaying ? <FiSquare className="text-xs" /> : <FiVolume2 className="text-xs" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {t("Uzbek:", "O'zbekcha:")} <span className="text-slate-200 font-medium">{item.translation}</span>
                    </div>

                    <div 
                      onClick={() => handleToggleSpeakWord(item, idx)}
                      className="text-xs text-slate-300 mt-1.5 italic bg-slate-900/60 p-2 rounded-lg border border-slate-800 flex items-start gap-1.5 cursor-pointer hover:border-teal-500/40"
                    >
                      <FiCheckCircle className="text-teal-400 text-xs mt-0.5 shrink-0" />
                      <span>"{item.example}"</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              {t("Press", "Ochish/yopish:")} <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300">V</kbd>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
