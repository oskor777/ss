import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { FiSun, FiAward, FiClock } from 'react-icons/fi';

export default function S06_WakeUpTime() {
  const { q1_wakeUp } = familyData;
  const { chartColors, isDark } = useTheme();
  const { t } = useLanguage();

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl shadow-lg border border-slate-700 bg-slate-900 text-white text-xs">
          <div className="font-heading font-bold text-teal-300 text-sm flex items-center gap-1.5">
            <span>{data.avatar}</span>
            <span>{data.member}</span>
          </div>
          <div className="text-amber-400 font-semibold my-0.5">
            {t('Wake-up:', 'Uyg\'onish:')} {data.label} ({data.decimalHour}h)
          </div>
          <div className="text-slate-300 italic">{data.note}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiClock className="text-xs sm:text-sm" /> {t('Slide 6 • Survey Question 1', '6-slayd • So\'rovnoma 1-savoli')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {q1_wakeUp.question}
          </h2>
        </div>

        {/* Early Bird Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <FiAward className="text-base sm:text-lg text-amber-500 shrink-0" />
          <span>
            {q1_wakeUp.badgeTitle}: <strong>{q1_wakeUp.earlyBirdWinner} ({q1_wakeUp.earlyBirdTime})</strong>
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left: Recharts Bar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-[290px] sm:h-[360px]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span>{t('Wake-up Hour (AM Decimal)', 'Uyg\'onish soati')}</span>
            <span>{t('Range: 5:30 AM to 8:00 AM', '05:30 dan 08:00 gacha')}</span>
          </div>

          <div className="w-full flex-1 min-h-[190px] sm:min-h-[260px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={q1_wakeUp.chartData}
                margin={{ top: 15, right: 10, left: -25, bottom: 20 }}
              >
                <XAxis
                  dataKey="member"
                  tick={{ fill: chartColors.text, fontSize: 10, fontFamily: 'Poppins' }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickLine={false}
                />
                <YAxis
                  domain={[4, 9]}
                  ticks={[5, 6, 7, 8]}
                  tick={{ fill: chartColors.text, fontSize: 10, fontFamily: 'Poppins' }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickLine={false}
                  unit=":00"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="decimalHour" radius={[8, 8, 0, 0]}>
                  {q1_wakeUp.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] sm:text-[11px] text-center text-slate-400">
            {t('📊 Hover or tap bars to see exact wake-up times and member morning duties.', '📊 Aniq vaqt va ertalabki vazifalarni ko\'rish uchun ustunlar ustiga bosing.')}
          </div>
        </div>

        {/* Right: Daily Habit Sentences (Present Simple) (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiSun className="text-amber-500" />
              <span>{t('Present Simple Observations:', 'Present Simple xulosalari:')}</span>
            </h3>

            <div className="space-y-2.5">
              {q1_wakeUp.grammaticalAnalysis.map((sentence, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{sentence}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-teal-600 dark:text-teal-400 font-medium">
              {t('💡 Key Grammar: Use at with clock times (at 5:30 AM, at 8:00 AM).', '💡 Grammatika: Soat vaqtlari bilan \'at\' predlogi ishlatiladi (at 5:30 AM, at 8:00 AM).')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
