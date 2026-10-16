import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiVolume2, FiSquare, FiBookOpen } from 'react-icons/fi';
import { familyData } from '../data/familyData';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../context/LanguageContext';

export default function NotesPanel({ isOpen, onClose, currentSlide }) {
  const { isUz, t, data } = useLanguage();
  const currentNote = data.speakerNotes[currentSlide] || "No speaker notes for this slide.";
  const { isSpeaking, speakingId, speak, stop } = useSpeech();
  const scriptId = `script-${currentSlide}`;
  const isPlayingThis = speakingId === scriptId;

  const handleToggleSpeak = () => {
    if (isPlayingThis) {
      stop();
    } else {
      speak(currentNote, scriptId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-14 sm:bottom-20 left-2.5 right-2.5 sm:left-auto sm:right-8 z-50 w-auto sm:w-11/12 max-w-lg p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl border border-teal-500/30 bg-slate-900/95 text-slate-100 dark:bg-slate-900/95 dark:text-slate-100"
          style={{ maxHeight: '78vh' }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2 text-teal-400">
              <FiVolume2 className="text-xl animate-pulse" />
              <h3 className="font-heading font-bold text-lg">
                {t("Speaker Script — Slide", "Taqdimotchi nutqi — Slayd")} {currentSlide} / 16
              </h3>
            </div>
            <button
              onClick={() => {
                stop();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close speaker notes"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="mt-4 overflow-y-auto pr-1 text-sm sm:text-base leading-relaxed text-slate-200">
            <p className={`p-4 rounded-xl border font-medium transition-all ${
              isPlayingThis
                ? 'bg-teal-950/60 border-teal-500 text-teal-100 ring-1 ring-teal-400 shadow-md'
                : 'bg-slate-800/60 border-slate-700/50 text-slate-200'
            }`}>
              "{currentNote}"
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
            {/* Listen Button */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-heading font-bold shadow-sm transition-all ${
                isPlayingThis
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-teal-500 hover:bg-teal-600 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {isPlayingThis ? (
                <>
                  <FiSquare className="text-sm" />
                  <span>{t("Stop", "To'xtatish")}</span>
                </>
              ) : (
                <>
                  <FiVolume2 className="text-sm" />
                  <span>{t("Read Aloud", "Matnni o'qib berish")}</span>
                </>
              )}
            </button>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-teal-400">
                <FiBookOpen /> A2–B1
              </span>
              <span>{t("Press", "Yopish:")} <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300">N</kbd></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
