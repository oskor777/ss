import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { FiCheckCircle, FiCompass, FiTarget, FiVolume2, FiSquare } from 'react-icons/fi';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../context/LanguageContext';

export default function S02_AboutMe() {
  const { student } = familyData.projectInfo;
  const { isUz, t } = useLanguage();
  const { speakingId, speak, stop, isSpeaking } = useSpeech();
  const [isPlayingFullSlide, setIsPlayingFullSlide] = useState(false);
  const isPlayingFullRef = useRef(false);

  const stopAll = useCallback(() => {
    isPlayingFullRef.current = false;
    setIsPlayingFullSlide(false);
    stop();
  }, [stop]);

  // Clean up when navigating away from slide
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  // Read full slide sequentially: Bio -> Obj 1 -> Obj 2 -> Obj 3 -> Obj 4
  const playSectionIndex = useCallback((index) => {
    if (!isPlayingFullRef.current) return;

    if (index === 0) {
      // Bio
      const bioText = `${student.name}. ${student.age} years old, ${student.grade}. ${student.bio}`;
      speak(bioText, 'bio', () => {
        if (isPlayingFullRef.current) {
          setTimeout(() => playSectionIndex(1), 500);
        }
      });
    } else if (index >= 1 && index <= student.objectives.length) {
      // Objectives
      const obj = student.objectives[index - 1];
      const objText = `Objective ${index}: ${obj.title}. ${obj.desc}`;
      speak(objText, `obj-${obj.id}`, () => {
        if (isPlayingFullRef.current) {
          if (index < student.objectives.length) {
            setTimeout(() => playSectionIndex(index + 1), 500);
          } else {
            isPlayingFullRef.current = false;
            setIsPlayingFullSlide(false);
          }
        }
      });
    } else {
      isPlayingFullRef.current = false;
      setIsPlayingFullSlide(false);
    }
  }, [speak, student.age, student.bio, student.grade, student.name, student.objectives]);

  const handleToggleFullSlide = () => {
    if (isPlayingFullSlide) {
      stopAll();
    } else {
      isPlayingFullRef.current = true;
      setIsPlayingFullSlide(true);
      playSectionIndex(0);
    }
  };

  const handleToggleBio = () => {
    if (isPlayingFullSlide) stopAll();
    if (speakingId === 'bio') {
      stop();
    } else {
      const bioText = `Hello! My name is ${student.name}. I am ${student.age} years old and I study in the ${student.grade}. ${student.bio}`;
      speak(bioText, 'bio');
    }
  };

  const handleToggleObj = (obj) => {
    if (isPlayingFullSlide) stopAll();
    const id = `obj-${obj.id}`;
    if (speakingId === id) {
      stop();
    } else {
      const text = `${obj.title}. ${obj.desc}`;
      speak(text, id);
    }
  };

  const isBioActive = speakingId === 'bio';

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-6xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Slide Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiCompass className="text-xs sm:text-sm" /> {t("Slide 2 • Introduction & Goals", "2-slayd • Kirish va maqsadlar")}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {t("About Me & Project Objectives", "O'zim haqimda va loyiha maqsadlari")}
          </h2>
        </div>

        {/* Global Slide 2 Speech Button */}
        <div className="flex items-center justify-center sm:justify-end">
          <button
            onClick={handleToggleFullSlide}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-heading font-bold shadow-md transition-all ${
              isPlayingFullSlide
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isPlayingFullSlide ? (
              <>
                <FiSquare className="text-sm" />
                <span>{t("Stop", "To'xtatish")}</span>
              </>
            ) : (
              <>
                <FiVolume2 className="text-base" />
                <span>{t("Read Full Slide", "Slaydni to'liq o'qib berish")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left Column: Student Bio & Hobbies (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-5 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between border transition-all duration-300 shadow-sm relative ${
            isBioActive
              ? 'border-teal-400 ring-2 ring-teal-400/80 shadow-xl shadow-teal-500/20 bg-teal-500/10 dark:bg-teal-950/40'
              : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div>
            {/* Header: Avatar, Name & Speak Button */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {student.avatarEmoji}
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                    {student.name}
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                    {student.age} {t("Years Old", "yoshda")} • {student.grade}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {student.city}
                  </p>
                </div>
              </div>

              {/* Bio Speech Button */}
              <button
                onClick={handleToggleBio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all shadow-sm shrink-0 ${
                  isBioActive
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-teal-500/20 hover:bg-teal-500 text-teal-700 dark:text-teal-300 hover:text-white border border-teal-500/40'
                }`}
                title={isBioActive ? t("Stop", "To'xtatish") : t("Listen to Bio", "Biografiyani o'qib berish")}
              >
                {isBioActive ? (
                  <>
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-2.5 bg-white rounded-full animate-[bounce_0.6s_infinite]"></span>
                      <span className="w-1 h-3.5 bg-white rounded-full animate-[bounce_0.8s_infinite]"></span>
                      <span className="w-1 h-2 bg-white rounded-full animate-[bounce_0.7s_infinite]"></span>
                    </span>
                    <span>{t("Stop", "To'xtatish")}</span>
                  </>
                ) : (
                  <>
                    <FiVolume2 className="text-sm" />
                    <span>{t("Listen", "O'qish")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Bio Paragraph (Clickable to read) */}
            <p 
              onClick={handleToggleBio}
              className={`text-xs sm:text-sm leading-relaxed mb-3 cursor-pointer p-2 rounded-xl transition-all ${
                isBioActive
                  ? 'text-teal-900 dark:text-teal-100 bg-teal-500/20 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
              title={t("Click to listen", "Bosing: Ovoz chiqarib o'qib beradi")}
            >
              {student.bio}
            </p>

            <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
              {t("My Daily Hobbies & Free Time", "Kundalik sevimli mashg'ulotlarim")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {student.hobbies.map((hobby, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-1.5 font-heading font-bold text-xs text-slate-800 dark:text-slate-200">
                    <span>{hobby.icon}</span>
                    <span>{hobby.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {hobby.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🏠</span>
              <span>{t("Family: 7 members (Parents + 5 Children)", "Oila: 7 kishi (Ota-onam + 5 farzand)")}</span>
            </span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold text-[11px]">{t("Option A Survey", "A-variant so'rovnoma")}</span>
          </div>
        </motion.div>

        {/* Right Column: 4 Project Objectives (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div className="mb-2">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <FiTarget className="text-teal-500" />
              <span>{t("BSB Assessment Objectives (A2–B1)", "BSB baholash maqsadlari (A2–B1)")}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("Four key competencies demonstrated in this research (click any to listen):", "Ushbu tadqiqotda namoyon bo'lgan 4 ta asosiy ko'nikma (eshitish uchun bosing):")}
            </p>
          </div>

          {/* 4 Interactive Objective Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
            {student.objectives.map((obj, idx) => {
              const isObjActive = speakingId === `obj-${obj.id}`;

              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.2 }}
                  onClick={() => handleToggleObj(obj)}
                  className={`glass-card p-3.5 rounded-2xl border transition-all duration-300 shadow-sm cursor-pointer relative ${
                    isObjActive
                      ? 'border-teal-400 ring-2 ring-teal-400/80 shadow-lg shadow-teal-500/20 bg-teal-500/15 dark:bg-teal-950/40 scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:scale-[1.01]'
                  }`}
                  title={t("Click to listen", "Bosing: O'qib beradi")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="text-xl p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                        {obj.icon}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                          {obj.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {obj.desc}
                        </p>
                      </div>
                    </div>

                    {/* Audio icon badge */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleObj(obj);
                      }}
                      className={`p-1.5 rounded-lg transition-all shrink-0 ${
                        isObjActive
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-teal-500/20 text-teal-600 dark:text-teal-300 hover:bg-teal-500 hover:text-white'
                      }`}
                      title={isObjActive ? t("Stop", "To'xtatish") : t("Listen", "O'qib berish")}
                    >
                      {isObjActive ? <FiSquare className="text-xs" /> : <FiVolume2 className="text-xs" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Grammar Target Alert */}
          <div className="mt-3 p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-3">
            <FiCheckCircle className="text-teal-500 text-xl shrink-0" />
            <p className="text-xs text-teal-800 dark:text-teal-300">
              <strong>{t("Grammar Target:", "Grammatika maqsadi:")}</strong> {t("Every routine statement uses the Present Simple tense (he wakes up, she teaches, we eat) with correct time prepositions (at, in the morning, on weekends).", "Har bir kun tartibi jumlasida Present Simple zamoni (he wakes up, she teaches, we eat) va vaqt predloglari (at, in the morning, on weekends) qo'llaniladi.")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
