import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playSwitchClick } from '../utils/soundEffects';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const handleSelect = (targetLang) => {
    if (lang === targetLang) return;
    playSwitchClick();
    setLang(targetLang);
  };

  return (
    <div 
      className="inline-flex items-center p-0.5 sm:p-1 rounded-full bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700 shadow-inner text-[11px] sm:text-xs font-heading font-bold select-none shrink-0"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all duration-150 cursor-pointer ${
          lang === 'en'
            ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md font-extrabold scale-105'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        title="Switch to English"
      >
        <span className="text-xs sm:text-sm">🇬🇧</span>
        <span className="tracking-wide">EN</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('uz')}
        className={`relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all duration-150 cursor-pointer ${
          lang === 'uz'
            ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md font-extrabold scale-105'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        title="O'zbek tiliga o'tkazish"
      >
        <span className="text-xs sm:text-sm">🇺🇿</span>
        <span className="tracking-wide">UZ</span>
      </button>
    </div>
  );
}
