import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { FiUsers, FiCheck, FiInfo, FiVolume2, FiSquare } from 'react-icons/fi';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../context/LanguageContext';

export default function S03_MeetFamily() {
  const { familyMembers } = familyData;
  const { isUz, t } = useLanguage();
  const { speakingId, speak, stop, isSpeaking } = useSpeech();
  const [isSequentialPlaying, setIsSequentialPlaying] = useState(false);
  const sequentialIndexRef = useRef(0);
  const isPlayingAllRef = useRef(false);

  const getMemberSpeechText = useCallback((member) => {
    return `${member.name}, ${member.relationship}. ${member.shortRoutine}`;
  }, []);

  const stopAllPlayback = useCallback(() => {
    isPlayingAllRef.current = false;
    setIsSequentialPlaying(false);
    stop();
  }, [stop]);

  // Clean up when leaving slide
  useEffect(() => {
    return () => {
      stopAllPlayback();
    };
  }, [stopAllPlayback]);

  // Sequential playback for "Play All"
  const playMemberAt = useCallback((index) => {
    if (!isPlayingAllRef.current || index >= familyMembers.length) {
      isPlayingAllRef.current = false;
      setIsSequentialPlaying(false);
      return;
    }

    const member = familyMembers[index];
    sequentialIndexRef.current = index;
    const text = getMemberSpeechText(member);

    speak(text, `member-${member.id}`, () => {
      if (isPlayingAllRef.current) {
        // Delay slightly before next member for pleasant pacing
        setTimeout(() => {
          if (isPlayingAllRef.current) {
            playMemberAt(index + 1);
          }
        }, 600);
      }
    });
  }, [familyMembers, getMemberSpeechText, speak]);

  const handlePlayAllToggle = () => {
    if (isSequentialPlaying) {
      stopAllPlayback();
    } else {
      isPlayingAllRef.current = true;
      setIsSequentialPlaying(true);
      playMemberAt(0);
    }
  };

  const handleToggleSpeak = (member) => {
    if (isSequentialPlaying) {
      stopAllPlayback();
    }
    const memberKey = `member-${member.id}`;
    if (speakingId === memberKey) {
      stop();
    } else {
      const text = getMemberSpeechText(member);
      speak(text, memberKey);
    }
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiUsers className="text-xs sm:text-sm" /> {t("Slide 3 • Household Overview", "3-slayd • Xonadon a'zolari")}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {t("Meet My Family (7 Members)", "Oilam bilan tanishing (7 a'zo)")}
          </h2>
        </div>

        {/* Action Header: Play All button & Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handlePlayAllToggle}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-heading font-bold shadow-md transition-all ${
              isSequentialPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isSequentialPlaying ? (
              <>
                <FiSquare className="text-sm" />
                <span>{t("Stop All", "To'xtatish")}</span>
              </>
            ) : (
              <>
                <FiVolume2 className="text-base" />
                <span>{t("Play All Routines", "Ketma-ket gapirib berish")}</span>
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:flex items-center gap-1.5">
            <FiInfo className="text-teal-500" />
            <span>{t("I interviewed 5 members", "5 nafaridan intervyu oldim")}</span>
          </p>
        </div>
      </div>

      {/* 7 Animated Family Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-auto">
        {familyMembers.map((member, idx) => {
          const isCurrentActive = speakingId === `member-${member.id}`;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`glass-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border transition-all duration-300 shadow-sm relative overflow-hidden ${
                isCurrentActive
                  ? 'border-teal-400 ring-2 ring-teal-400/80 shadow-xl shadow-teal-500/20 scale-[1.02] bg-teal-500/15 dark:bg-teal-950/40'
                  : member.interviewed 
                    ? 'border-teal-500/40 bg-gradient-to-b from-teal-500/5 to-transparent hover:scale-[1.01]' 
                    : 'border-slate-200 dark:border-slate-800 opacity-90 hover:scale-[1.01]'
              }`}
            >
              {/* Top Row: Avatar & Speech Button */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl filter drop-shadow-sm p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {member.avatar}
                  </span>

                  {member.interviewed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                      <FiCheck className="text-xs" /> {t("Interviewed", "Intervyu olingan")}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                      {t("Little Sibling", "Kichik uka/singil")}
                    </span>
                  )}
                </div>

                {/* Speak / Stop Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSpeak(member);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-bold transition-all shadow-sm ${
                    isCurrentActive
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-pulse'
                      : 'bg-teal-500/20 hover:bg-teal-500 text-teal-700 dark:text-teal-300 hover:text-white border border-teal-500/40'
                  }`}
                  aria-label={isCurrentActive ? `Stop reading ${member.name}` : `Listen to ${member.name}'s routine`}
                  title={isCurrentActive ? t("Stop", "To'xtatish") : t("Listen", "O'qish")}
                >
                  {isCurrentActive ? (
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

              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">
                    {member.age} {t("yrs", "yosh")}
                  </span>
                </div>

                <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2">
                  {member.relationship} • {member.occupation}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2 line-clamp-2">
                  {member.description}
                </p>
              </div>

              {/* Daily Routine Snippet (Clickable to Speak) */}
              <div
                onClick={() => handleToggleSpeak(member)}
                className={`mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[11px] italic cursor-pointer transition-all rounded-lg p-1.5 ${
                  isCurrentActive
                    ? 'text-teal-900 dark:text-teal-200 font-semibold bg-teal-500/25 border border-teal-400/50 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
                title={t("Click to listen", "Bosing: O'qib beradi")}
              >
                <div className="flex items-center justify-between gap-1">
                  <span>"{member.shortRoutine}"</span>
                  <FiVolume2 className={`text-xs shrink-0 transition-opacity ${isCurrentActive ? 'text-teal-400 opacity-100 animate-pulse' : 'opacity-40'}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grammar & Audio Note */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <div>
          💡 <em>Present Simple:</em> <strong>He works</strong> • <strong>She teaches</strong> • <strong>They attend</strong>.
        </div>
        <div className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
          <span>🔊</span>
          <span>{t("Click 'Listen' on each card to hear pronunciation.", "Har bir kartochkadagi 'O'qish' tugmasini bosib talaffuzni tinglang.")}</span>
        </div>
      </div>
    </div>
  );
}
