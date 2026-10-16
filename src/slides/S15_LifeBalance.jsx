import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FiSliders, FiHeart, FiCheck } from 'react-icons/fi';

export default function S15_LifeBalance() {
  const { lifeBalance } = familyData;
  const { chartColors } = useTheme();
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl shadow-lg border border-slate-700 bg-slate-900 text-white text-xs">
          <div className="font-heading font-bold text-teal-300 text-sm flex items-center gap-1.5">
            <span>{data.icon}</span>
            <span>{data.name}</span>
          </div>
          <div className="text-amber-400 font-semibold my-0.5">
            {data.hours} {t('Hours / Day', 'Soat / Kun')} ({data.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="mb-3 sm:mb-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
          <FiSliders className="text-xs sm:text-sm" /> {t('Slide 15 • 24-Hour Balance', '15-slayd • 24 soatlik muvozanat')}
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {lifeBalance.title}
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
          {lifeBalance.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left: Recharts 24-Hour Doughnut Chart (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span>{t('Daily 24-Hour Allocation', 'Kunlik 24 soat taqsimoti')}</span>
            <span className="font-mono">{t('Total: 24 Hours', 'Jami: 24 soat')}</span>
          </div>

          <div className="w-full h-56 sm:h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={lifeBalance.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="85%"
                  paddingAngle={3}
                  dataKey="hours"
                >
                  {lifeBalance.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Doughnut center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-heading font-extrabold text-teal-600 dark:text-teal-400">
                24 h
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {t('Balanced Day', 'Muvozanatli kun')}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            {lifeBalance.pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.icon} {item.name.split(' ')[0]} ({item.hours}h)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Reflection on Quality Family Time (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <FiHeart className="text-rose-500 text-xl" />
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                {lifeBalance.reflection.headline}
              </h3>
            </div>

            <div className="space-y-2.5">
              {lifeBalance.reflection.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="text-xs" />
                  </span>
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-300">
            {t('💬 Final Reflection: "Good routines give us discipline, but loving family time gives us happiness and peace of mind."', '💬 Yakuniy xulosa: "Tartibli kun bizga intizom beradi, mehrli oilaviy vaqt esa bizga baxt va qalb xotirjamligini bag\'ishlaydi."')}
          </div>
        </div>
      </div>
    </div>
  );
}
