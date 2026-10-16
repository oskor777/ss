import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useLanguage } from '../context/LanguageContext';
import { FiMinimize2, FiLayers, FiInfo } from 'react-icons/fi';

export default function S13_VennDiagram() {
  const { vennData } = familyData;
  const { t } = useLanguage();
  const [activeZone, setActiveZone] = useState('allThree'); // default center

  const zones = {
    allThree: {
      title: t("Shared by All Three (Father, Mother & Me)", "Uchalamiz uchun umumiy (Dadam, Onam va Men)"),
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
      icon: "💖",
      items: vennData.allThree,
    },
    fatherOnly: {
      title: t("Father Only (Baxtiyor, 42)", "Faqat Dadam (Baxtiyor, 42)"),
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/30",
      icon: "👨‍💼",
      items: vennData.fatherOnly,
    },
    motherOnly: {
      title: t("Mother Only (Nodira, 39)", "Faqat Onam (Nodira, 39)"),
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/30",
      icon: "👩‍🏫",
      items: vennData.motherOnly,
    },
    salohiddinOnly: {
      title: t("Salohiddin Only (Me, 13)", "Faqat Salohiddin (Men, 13)"),
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/30",
      icon: "🎒",
      items: vennData.salohiddinOnly,
    },
    fatherAndMother: {
      title: t("Father & Mother Shared", "Dadam va Onam uchun umumiy"),
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30",
      icon: "💍",
      items: vennData.fatherAndMother,
    },
    motherAndSalohiddin: {
      title: t("Mother & Salohiddin Shared", "Onam va Salohiddin uchun umumiy"),
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      icon: "📚",
      items: vennData.motherAndSalohiddin,
    },
    fatherAndSalohiddin: {
      title: t("Father & Salohiddin Shared", "Dadam va Salohiddin uchun umumiy"),
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/30",
      icon: "⚽",
      items: vennData.fatherAndSalohiddin,
    },
  };

  const currentZoneData = zones[activeZone] || zones.allThree;

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2.5 sm:mb-3 gap-1 sm:gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiLayers className="text-xs sm:text-sm" /> {t('Slide 13 • Comparative Analysis', '13-slayd • Qiyosiy tahlil')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {vennData.title}
          </h2>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-0 flex items-center gap-1">
          <FiInfo className="text-teal-500 shrink-0" /> {t('Click or hover SVG zones to inspect details', 'Tafsilotlarni ko\'rish uchun zonalarni bosing')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left: Custom Interactive SVG Venn Diagram (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative">
          <svg viewBox="0 0 400 360" className="w-full max-w-[270px] sm:max-w-[380px] h-auto drop-shadow-md select-none">
            {/* Circle 1: Father (Top Left) */}
            <circle
              cx="160"
              cy="150"
              r="105"
              fill="#3b82f6"
              fillOpacity={activeZone.includes('father') || activeZone === 'allThree' ? "0.35" : "0.15"}
              stroke="#3b82f6"
              strokeWidth="2.5"
              className="cursor-pointer transition-all hover:fill-opacity-40"
              onClick={() => setActiveZone('fatherOnly')}
            />

            {/* Circle 2: Mother (Top Right) */}
            <circle
              cx="240"
              cy="150"
              r="105"
              fill="#ec4899"
              fillOpacity={activeZone.includes('mother') || activeZone === 'allThree' ? "0.35" : "0.15"}
              stroke="#ec4899"
              strokeWidth="2.5"
              className="cursor-pointer transition-all hover:fill-opacity-40"
              onClick={() => setActiveZone('motherOnly')}
            />

            {/* Circle 3: Salohiddin / Me (Bottom Center) */}
            <circle
              cx="200"
              cy="225"
              r="105"
              fill="#14b8a6"
              fillOpacity={activeZone.includes('salohiddin') || activeZone === 'allThree' ? "0.35" : "0.15"}
              stroke="#14b8a6"
              strokeWidth="2.5"
              className="cursor-pointer transition-all hover:fill-opacity-40"
              onClick={() => setActiveZone('salohiddinOnly')}
            />

            {/* Labels inside diagram */}
            <text x="120" y="110" fill="#3b82f6" fontSize="13" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
              👨‍💼 {t('Father', 'Dadam')}
            </text>
            <text x="280" y="110" fill="#ec4899" fontSize="13" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
              👩‍🏫 {t('Mother', 'Onam')}
            </text>
            <text x="200" y="305" fill="#14b8a6" fontSize="13" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
              🎒 {t('Salohiddin (Me)', 'Salohiddin (Men)')}
            </text>

            {/* Central All-Three Touch Point */}
            <circle
              cx="200"
              cy="175"
              r="28"
              fill="#f59e0b"
              fillOpacity={activeZone === 'allThree' ? "0.8" : "0.4"}
              stroke="#fbbf24"
              strokeWidth="2"
              className="cursor-pointer transition-all hover:scale-110"
              onClick={() => setActiveZone('allThree')}
            />
            <text x="200" y="180" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
              {t('ALL', 'HAMMA')}
            </text>
          </svg>

          {/* Quick Zone Selector Buttons */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-2">
            <button
              onClick={() => setActiveZone('allThree')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-heading font-bold border transition ${
                activeZone === 'allThree' ? 'bg-amber-500 text-white border-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('💖 Shared by ALL', '💖 Hammasi uchun umumiy')}
            </button>
            <button
              onClick={() => setActiveZone('fatherOnly')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-heading font-bold border transition ${
                activeZone === 'fatherOnly' ? 'bg-blue-500 text-white border-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('👨‍💼 Father Only', '👨‍💼 Faqat Dadam')}
            </button>
            <button
              onClick={() => setActiveZone('motherOnly')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-heading font-bold border transition ${
                activeZone === 'motherOnly' ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('👩‍🏫 Mother Only', '👩‍🏫 Faqat Onam')}
            </button>
            <button
              onClick={() => setActiveZone('salohiddinOnly')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-heading font-bold border transition ${
                activeZone === 'salohiddinOnly' ? 'bg-teal-500 text-white border-teal-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('🎒 Me Only', '🎒 Faqat Men')}
            </button>
          </div>
        </div>

        {/* Right: Selected Zone Details & Analysis (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 min-h-0 sm:min-h-[350px]">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-2xl">{currentZoneData.icon}</span>
              <h3 className={`font-heading font-extrabold text-lg sm:text-xl ${currentZoneData.color}`}>
                {currentZoneData.title}
              </h3>
            </div>

            <div className="space-y-2.5">
              {currentZoneData.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed ${currentZoneData.bg} text-slate-800 dark:text-slate-200`}
                >
                  • {item}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            {t('🗣️ Key Synthesis: "Although our daytime duties are different, our evening gathering unites the entire family."', '🗣️ Asosiy xulosa: "Kunduzgi mashg\'ulotlarimiz har xil bo\'lsa ham, kechki dasturxon barcha oilamizni birlashtiradi."')}
          </div>
        </div>
      </div>
    </div>
  );
}
