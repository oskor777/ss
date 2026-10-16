import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FiHeart, FiClock, FiCalendar } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

export default function S08_TimeTogether() {
  const { q3_timeTogether } = familyData;
  const { chartColors } = useTheme();
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl shadow-lg border border-slate-700 bg-slate-900 text-white text-xs">
          <div className="font-heading font-bold text-teal-300 text-sm flex items-center gap-1.5">
            <span>{data.emoji}</span>
            <span>{data.name}</span>
          </div>
          <div className="text-amber-400 font-semibold my-0.5">
            {data.value}% {t('of family time', 'oilaviy vaqt')} ({data.hours})
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-1.5 sm:gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiHeart className="text-xs sm:text-sm" /> {t('Slide 8 • Survey Question 3', '8-slayd • So\'rovnoma 3-savoli')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {q3_timeTogether.question}
          </h2>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
          {t('Calculating weekday and weekend family bonding hours', 'Hafta ichi va dam olish kunlaridagi umumiy oilaviy vaqt')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left: Recharts Doughnut Chart (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span>{t('How Family Time is Distributed', 'Oilaviy vaqt taqsimoti')}</span>
            <span>{t('Hover slices for hours', 'Ustiga bosing')}</span>
          </div>

          <div className="w-full h-56 sm:h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={q3_timeTogether.doughnutData}
                  cx="50%"
                  cy="50%"
                  innerRadius="56%"
                  outerRadius="84%"
                  paddingAngle={4}
                  dataKey="value"
                >
                  {q3_timeTogether.doughnutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center label inside doughnut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl sm:text-3xl font-heading font-extrabold text-teal-600 dark:text-teal-400">
                100%
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {t('Family Time', 'Oilaviy vaqt')}
              </span>
            </div>
          </div>

          {/* Legend Chips */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center pt-2 border-t border-slate-200 dark:border-slate-800">
            {q3_timeTogether.doughnutData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span>{item.emoji} {item.name.split(' ')[0]} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Big Animated Counters & Insights (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3 sm:gap-4">
          {/* Big Highlight Weekly Counter */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-transparent to-sky-500/10">
            <div className="text-[11px] sm:text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              {t('Total Family Time Per Week', 'Haftalik jami oilaviy vaqt')}
            </div>
            <div className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 dark:text-white mb-2 flex items-baseline gap-2">
              <AnimatedCounter value={q3_timeTogether.weeklyTotalHours} decimals={1} className="text-teal-600 dark:text-teal-400" />
              <span className="text-base sm:text-2xl text-slate-500 dark:text-slate-400 font-normal">{t('Hours / Week', 'Soat / Hafta')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              "{q3_timeTogether.highlightInsight}"
            </p>
          </div>

          {/* Weekday vs Weekend Comparison Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <div className="glass-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mb-1">
                <FiClock className="text-sky-500 shrink-0" />
                <span>{t('Weekdays (Mon–Fri)', 'Hafta kunlari')}</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-extrabold text-sky-600 dark:text-sky-400">
                <AnimatedCounter value={q3_timeTogether.weekdayHours} decimals={1} suffix={` ${t('h / day', 'soat/kun')}`} />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {t('Evenings during dinner & tea', 'Kechki ovqat va choy ustida')}
              </p>
            </div>

            <div className="glass-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mb-1">
                <FiCalendar className="text-amber-500 shrink-0" />
                <span>{t('Weekends (Sat–Sun)', 'Dam olish kunlari')}</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-extrabold text-amber-500">
                <AnimatedCounter value={q3_timeTogether.weekendHours} decimals={1} suffix={` ${t('h / day', 'soat/kun')}`} />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {t('Cooking, park trips & games', 'Pishiriq, sayr va o\'yinlar')}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
            {t('🗣️ Present Simple Expression: "We spend 34.5 hours together every week. We never eat dinner alone."', '🗣️ Present Simple ifodasi: "Biz har hafta birgalikda 34.5 soat vaqt o\'tkazamiz. Biz kechki ovqatni hech qachon yolg\'iz yemaymiz."')}
          </div>
        </div>
      </div>
    </div>
  );
}
